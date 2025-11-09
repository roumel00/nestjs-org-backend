import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getDb } from '../../config/database.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrgMemberGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Get user ID from session (Better Auth session)
    const session = request.session;
    if (!session || !session.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const userId = session.user.id;

    // Get org ID from headers
    const orgId = request.headers['x-org-id'];
    if (!orgId) {
      throw new BadRequestException('Organisation ID is required');
    }

    if (!ObjectId.isValid(orgId)) {
      throw new BadRequestException('Invalid Organisation ID format');
    }

    // Validate UserInOrg relationship exists
    const db = await getDb();
    const userInOrg = await db.collection('userInOrg').findOne({
      userId: userId,
      orgId: orgId,
    });

    if (!userInOrg) {
      throw new UnauthorizedException('User is not a member of this organization');
    }

    // Attach userInOrg to request for use in controllers
    request.userInOrg = userInOrg;
    request.orgId = orgId;

    return true;
  }
}
