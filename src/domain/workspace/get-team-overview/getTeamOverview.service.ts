import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamMember,
  TeamMemberDocument,
} from '@schemas/teamMember.schema.js';
import { getOwnerQuery, getRoleCountsQuery, getRecentByRoleQuery } from './getTeamOverview.query.js';

@Injectable()
export class GetTeamOverviewService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getTeamOverview(workspaceId: string) {
    const [owner] = await this.teamMemberModel
      .aggregate(getOwnerQuery(workspaceId))
      .exec();

    const countResults = await this.teamMemberModel
      .aggregate(getRoleCountsQuery(workspaceId))
      .exec();

    const counts = { admins: 0, members: 0, invitees: 0 };
    for (const { _id, count } of countResults) {
      if (_id === 'admin') counts.admins = count;
      else if (_id === 'member') counts.members = count;
      else if (_id === 'invitee') counts.invitees = count;
    }

    const [recentAdmins, recentMembers] = await Promise.all([
      this.teamMemberModel
        .aggregate(getRecentByRoleQuery(workspaceId, 'admin', 2))
        .exec(),
      this.teamMemberModel
        .aggregate(getRecentByRoleQuery(workspaceId, 'member', 2))
        .exec(),
    ]);

    return { owner, counts, recentAdmins, recentMembers };
  }
}
