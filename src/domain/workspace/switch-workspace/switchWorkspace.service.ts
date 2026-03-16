import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class SwitchWorkspaceService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async switchWorkspace(userId: string, workspaceId: string, req: Request): Promise<string> {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      workspaceId: workspaceId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new UnauthorizedException('User is not a member of this workspace');
    }

    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedWorkspace: workspaceId }
    });

    return workspaceId;
  }
}
