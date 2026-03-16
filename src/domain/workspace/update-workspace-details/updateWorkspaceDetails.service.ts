import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '@schemas/workspace.schema.js';
import type { UpdateWorkspaceDetailsRequest, UpdateWorkspaceDetailsResponse } from './updateWorkspaceDetails.types.js';

@Injectable()
export class UpdateWorkspaceDetailsService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async updateWorkspaceDetails(workspaceId: string, dto: UpdateWorkspaceDetailsRequest): Promise<UpdateWorkspaceDetailsResponse> {
    const update: Record<string, any> = {};

    if (dto.name !== undefined) update.name = dto.name;
    if (dto.timezone !== undefined) update.timezone = dto.timezone;
    if (dto.logo !== undefined) update.logo = dto.logo;

    const workspace = await this.workspaceModel.findByIdAndUpdate(
      workspaceId,
      { $set: update },
      { new: true },
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
