import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class WorkspaceMemberGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Get user ID from session (Better Auth session)
    const session = request.session;
    if (!session || !session.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const userId = session.user.id;

    // Get workspace ID from user's lastAccessedWorkspace(stored in session)
    const workspaceId = session.user.lastAccessedWorkspace;
    if (!workspaceId) {
      throw new BadRequestException('No workspace selected. Please select a workspace first.');
    }

    if (!ObjectId.isValid(workspaceId)) {
      throw new BadRequestException('Invalid Workspace ID format');
    }

    // Validate TeamMember relationship exists
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      workspaceId: workspaceId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new UnauthorizedException('User is not a member of this workspace');
    }

    // Attach teamMember to request for use in controllers (keeping userInWorkspacefor backward compatibility)
    request.userInWorkspace= teamMember;
    request.teamMember = teamMember;
    request.workspaceId = workspaceId;

    return true;
  }
}
