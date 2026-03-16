import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { getUserWorkspacesQuery } from './getWorkspaces.query.js';

@Injectable()
export class GetWorkspacesService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getUserWorkspaces(userId: string) {
    const workspaces = await this.teamMemberModel.aggregate(getUserWorkspacesQuery(userId));
    return workspaces.map((workspace) => ({
      ...workspace,
      logo: workspace.logo ?? null,
    }));
  }
}
