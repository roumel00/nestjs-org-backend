import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Workspace, WorkspaceDocument } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

type ExtendedUserSession = UserSession & {
  user: UserSession['user'] & {
    lastAccessedWorkspace?: string;
  };
};

@Injectable()
export class GetCurrentWorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getCurrentWorkspace(session: ExtendedUserSession) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: session.user.id,
      workspaceId: session.user.lastAccessedWorkspace,
      deletedAt: null,
    }).exec();

    const workspace = await this.workspaceModel.findOne({
      _id: session.user.lastAccessedWorkspace,
    }).exec();

    if (!workspace || !teamMember) {
      return { currentWorkspace: null }
    }

    return { currentWorkspace: { teamMember, workspace } }
  }
}
