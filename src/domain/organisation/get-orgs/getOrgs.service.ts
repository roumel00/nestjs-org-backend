import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { getUserOrganisationsQuery } from './getOrgs.query.js';

@Injectable()
export class GetOrgsService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    return this.teamMemberModel.aggregate(getUserOrganisationsQuery(userId));
  }
}
