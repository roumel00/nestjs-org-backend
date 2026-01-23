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
import { TeamMember, TeamMemberDocument } from '../../schemas/teamMember.schema.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrgMemberGuard implements CanActivate {
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

    // Get org ID from user's lastAccessedOrg (stored in session)
    const orgId = session.user.lastAccessedOrg;
    if (!orgId) {
      throw new BadRequestException('No organisation selected. Please select an organisation first.');
    }

    if (!ObjectId.isValid(orgId)) {
      throw new BadRequestException('Invalid Organisation ID format');
    }

    // Validate TeamMember relationship exists
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new UnauthorizedException('User is not a member of this organisation');
    }

    // Attach teamMember to request for use in controllers (keeping userInOrg for backward compatibility)
    request.userInOrg = teamMember;
    request.teamMember = teamMember;
    request.orgId = orgId;

    return true;
  }
}
