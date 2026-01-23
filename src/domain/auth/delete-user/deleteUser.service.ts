import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../../../config/betterAuth.js';
import { Organisation, OrganisationDocument } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '../../../schemas/teamMember.schema.js';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async deleteUser(req: Request, session: UserSession, password: string) {
    const ownerTeamMembers = await this.teamMemberModel.find({
      userId: session.user.id,
      role: 'owner'
    }).select('orgId').lean().exec();

    const ownerOrgIds = ownerTeamMembers.map(tm => tm.orgId);

    await this.teamMemberModel.deleteMany({
      userId: session.user.id,
    }).exec();

    await this.teamMemberModel.deleteMany({
      email: session.user.email,
      userId: null,
      deletedAt: { $ne: null }
    }).exec();

    if (ownerOrgIds.length > 0) {
      await Promise.all([
        this.teamMemberModel.deleteMany({
          orgId: { $in: ownerOrgIds }
        }).exec(),
        this.organisationModel.deleteMany({
          _id: { $in: ownerOrgIds }
        }).exec(),
      ]);
    }

    const response = await auth.api.deleteUser({
      headers: req.headers,
      body: { password }
    });

    return response;
  }
}
