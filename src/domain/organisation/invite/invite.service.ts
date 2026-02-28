import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '@schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { getDb } from '@config/database.js';
import { sendInviteEmail } from '@config/email.js';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async invite(email: string, orgId: string) {
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
        // Convert invite to member by updating userId, role, and user data
        await this.teamMemberModel.updateOne(
          { _id: existingInvite._id },
          { $set: {
            userId: user._id.toString(),
            role: 'member',
            name: user.name ?? null,
            image: user.image ?? null,
          } }
        ).exec();
        savedTeamMember = await this.teamMemberModel.findById(existingInvite._id).exec();
      } else {
        // Create new teamMember as member (existing user accepts immediately)
        const teamMember = new this.teamMemberModel({
          orgId,
          email,
          userId: user._id.toString(),
          role: 'member',
          name: user.name ?? null,
          image: user.image ?? null,
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
        role: 'member',
        existingUser: true,
      });

      return savedTeamMember;
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
        role: 'invitee',
      });

      const savedTeamMember = await teamMember.save();

      // Send email to new user with signup link
      await sendInviteEmail({
        email,
        orgName: organisation.name,
        role: 'invitee',
        existingUser: false,
      });

      return savedTeamMember;
    }
  }
}
