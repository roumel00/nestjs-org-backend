import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import type { CreateWorkspaceRequest } from './createWorkspace.types.js';
import { auth } from '@config/betterAuth.js';
import { getDb } from '@config/database.js';

@Injectable()
export class CreateWorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async createWorkspace(userId: string, userEmail: string, createWorkspaceDto: CreateWorkspaceRequest, req: Request) {
    // Check if user already owns a workspace
    const existingOwnership = await this.teamMemberModel.findOne({
      userId: userId,
      role: 'owner',
      deletedAt: null,
    }).exec();

    if (existingOwnership) {
      throw new BadRequestException('You can only own one workspace');
    }

    // Create the workspace
    const workspace = new this.workspaceModel({
      owner: userId,
      name: createWorkspaceDto.name,
      timezone: createWorkspaceDto.timezone,
      logo: createWorkspaceDto.logo || null,
    });

    const savedWorkspace = await workspace.save();
    const workspaceId = savedWorkspace.id;

    // Fetch user data for denormalization
    const db = await getDb();
    const user = await db.collection('user').findOne({ email: userEmail });

    // Create teamMember entry for the owner
    const teamMember = new this.teamMemberModel({
      workspaceId: workspaceId,
      email: userEmail,
      userId: userId,
      role: 'owner',
      name: user?.name ?? null,
      image: user?.image ?? null,
    });

    await teamMember.save();

    // Update user's lastAccessedWorkspace
    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedWorkspace: workspaceId }
    });

    return savedWorkspace;
  }
}
