import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '../schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '../schemas/teamMember.schema.js';
import { ObjectId } from 'mongodb';
import { auth } from '../../config/auth.js';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { getDb } from '../../config/database.js';
import { sendInviteEmail } from '../../config/email.js';

type ExtendedUserSession = UserSession & {
  user: UserSession['user'] & {
    lastAccessedOrg?: string;
  };
};

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    const teamMembers = await this.teamMemberModel.find({
      userId: userId,
      deletedAt: null,
    }).exec();

    if (teamMembers.length === 0 || !teamMembers) {
      return [];
    }

    const teamMemberMap = new Map(
      teamMembers.map(tm => [tm.orgId.toString(), tm])
    );

    // Get all organisation IDs
    const orgIds = teamMembers.map(tm => new ObjectId(tm.orgId));

    // Fetch all organisations
    const organisations: OrganisationDocument[] = await this.organisationModel.find({
      _id: { $in: orgIds },
    }).exec();

    // Combine teamMember data with organisation data
    const result = organisations.map((org: OrganisationDocument) => {
      const teamMember = teamMemberMap.get(org.id);
      
      return {
        orgId: org.id,
        name: org.name,
        timezone: org.timezone,
        owner: org.owner,
        role: teamMember!.role,
      };
    });

    return result;
  }

  async getCurrentOrganisation(session: ExtendedUserSession) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: session.user.id,
      orgId: session.user.lastAccessedOrg,
      deletedAt: null,
    }).exec();

    const organisation = await this.organisationModel.findOne({
      _id: session.user.lastAccessedOrg,
    }).exec();

    if (!organisation || !teamMember) {
      return { currentOrg: null }
    }

    return { currentOrg: { teamMember, organisation } }
  }

  async switchOrganisation(userId: string, orgId: string, req: Request): Promise<string> {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new UnauthorizedException('User is not a member of this organisation');
    }

    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: orgId }
    });

    return orgId;
  }

  async removeUser(orgId: string, userId: string) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new NotFoundException('User not found');
    }

    if (teamMember.role === 'owner' || teamMember.role === 'admin') {
      throw new BadRequestException('Owner or admin cannot be removed from the organisation');
    }

    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { deletedAt: new Date() } }).exec();

    return { message: 'User removed from organisation successfully' }
  }

  async changeRole(orgId: string, userId: string, role: string) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();
    
    if (!teamMember) {
      throw new NotFoundException('User not found');
    }

    if (teamMember.role === 'owner') {
      throw new BadRequestException('Owner cannot be changed to a different role');
    }
    
    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { role: role as 'owner' | 'admin' | 'member' } }).exec();

    return { message: 'Role changed successfully' }
  }

  async invite(email: string, role: string, orgId: string) {
    // Get organisation name for email
    const organisation = await this.organisationModel.findById(orgId).exec();
    
    if (!organisation) {
      throw new Error('Organisation not found');
    }

    const db = await getDb();

    const user = await db.collection('user').findOne({ email });

    if (user) {
      // Check if user is already in this org
      const existingTeamMember = await this.teamMemberModel.findOne({
        userId: user._id.toString(),
        orgId: orgId,
        deletedAt: null,
      }).exec();

      if (existingTeamMember) {
        throw new Error('User is already a member of this organisation');
      }

      // Check if there's an existing invite for this email and convert it
      const existingInvite = await this.teamMemberModel.findOne({
        email,
        orgId: orgId,
        userId: null,
        deletedAt: null,
      }).exec();

      let savedTeamMember: TeamMemberDocument | null;
      if (existingInvite) {
        // Convert invite to teamMember by updating userId
        await this.teamMemberModel.updateOne(
          { _id: existingInvite._id },
          { $set: { userId: user._id.toString(), role: role as 'owner' | 'admin' | 'member' } }
        ).exec();
        savedTeamMember = await this.teamMemberModel.findById(existingInvite._id).exec();
      } else {
        // Create new teamMember
        const teamMember = new this.teamMemberModel({
          orgId,
          email,
          userId: user._id.toString(),
          role: role as 'owner' | 'admin' | 'member',
        });
        savedTeamMember = await teamMember.save();
      }

      if (!savedTeamMember) {
        throw new Error('Failed to create or update team member');
      }

      // Send email to existing user
      await sendInviteEmail({
        email,
        orgName: organisation.name,
        role,
        existingUser: true,
      });

      return { type: 'teamMember', data: savedTeamMember };
    } else {
      // Check if there's already an invite for this email
      const existingInvite = await this.teamMemberModel.findOne({
        email,
        orgId: orgId,
        userId: null,
        deletedAt: null,
      }).exec();

      if (existingInvite) {
        throw new Error('Invite already exists for this email');
      }

      const teamMember = new this.teamMemberModel({
        orgId,
        email,
        userId: null,
        role: role as 'admin' | 'member',
      });

      const savedTeamMember = await teamMember.save();

      // Send email to new user with signup link
      await sendInviteEmail({
        email,
        orgName: organisation.name,
        role,
        existingUser: false,
      });

      return { type: 'teamMember', data: savedTeamMember };
    }
  }

  async cancelInvite(inviteId: string) {
    const teamMember = await this.teamMemberModel.findByIdAndUpdate(
      inviteId,
      { deletedAt: new Date() },
      { new: true }
    ).exec();

    if (!teamMember) {
      throw new NotFoundException('Invite not found');
    }

    return { message: 'Invite cancelled successfully' };
  }
}

