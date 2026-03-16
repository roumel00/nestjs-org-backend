import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Workspace, WorkspaceDocument } from '@schemas/workspace.schema.js';
import type { GetWorkspaceDetailsResponse } from './getWorkspaceDetails.types.js';

type ExtendedUserSession = UserSession & {
  user: UserSession['user'] & {
    lastAccessedWorkspace?: string;
  };
};

@Injectable()
export class GetWorkspaceDetailsService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async getWorkspaceDetails(session: ExtendedUserSession): Promise<GetWorkspaceDetailsResponse> {
    const workspace = await this.workspaceModel.findById(
      session.user.lastAccessedWorkspace,
    ).exec();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return {
      name: workspace.name,
      logo: workspace.logo ?? null,
      timezone: workspace.timezone,
    };
  }
}
