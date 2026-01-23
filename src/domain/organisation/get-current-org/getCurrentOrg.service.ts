import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Organisation, OrganisationDocument } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '../../../schemas/teamMember.schema.js';

type ExtendedUserSession = UserSession & {
  user: UserSession['user'] & {
    lastAccessedOrg?: string;
  };
};

@Injectable()
export class GetCurrentOrgService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

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
}
