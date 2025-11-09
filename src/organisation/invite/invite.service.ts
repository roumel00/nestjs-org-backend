import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InviteInOrg, InviteInOrgDocument } from '../schemas/inviteInOrg.schema.js';
import { UserInOrg, UserInOrgDocument } from '../schemas/userInOrg.schema.js';
import { Organisation, OrganisationDocument } from '../schemas/organisation.schema.js';
import { getDb } from '../../config/database.js';
import { sendInviteEmail } from '../../config/email.js';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(InviteInOrg.name) private inviteInOrgModel: Model<InviteInOrgDocument>,
    @InjectModel(UserInOrg.name) private userInOrgModel: Model<UserInOrgDocument>,
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
  ) {}

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
      const existingUserInOrg = await this.userInOrgModel.findOne({
        userId: user._id.toString(),
        orgId: orgId,
        deletedAt: null,
      }).exec();

      if (existingUserInOrg) {
        throw new Error('User is already a member of this organisation');
      }

      const userInOrg = new this.userInOrgModel({
        orgId,
        userId: user._id.toString(),
        role: role as 'owner' | 'admin' | 'member',
      });

      const savedUserInOrg = await userInOrg.save();

      // Send email to existing user
      await sendInviteEmail({
        email,
        orgName: organisation.name,
        role,
        existingUser: true,
      });

      return { type: 'userInOrg', data: savedUserInOrg };
    } else {
      const inviteInOrg = new this.inviteInOrgModel({
        orgId,
        email,
        role: role as 'admin' | 'member',
      });

      const savedInvite = await inviteInOrg.save();

      // Send email to new user with signup link
      await sendInviteEmail({
        email,
        orgName: organisation.name,
        role,
        existingUser: false,
      });

      return { type: 'inviteInOrg', data: savedInvite };
    }
  }

  async cancelInvite(inviteId: string) {
    const invite = await this.inviteInOrgModel.findByIdAndUpdate(
      inviteId,
      { deletedAt: new Date() },
      { new: true }
    ).exec();

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    return { message: 'Invite cancelled successfully' };
  }
}