import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_ROLE_KEY } from '../decorators/requiredRole.decorator.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required role from decorator metadata
    const requiredRole = this.reflector.get<'owner' | 'admin' | 'member'>(
      REQUIRED_ROLE_KEY,
      context.getHandler(),
    );

    if (!requiredRole) {
      throw new BadRequestException(
        'RoleGuard requires @RequiredRole decorator to specify the required role level',
      );
    }

    const request = context.switchToHttp().getRequest();

    const teamMember = request.teamMember || request.userInOrg;
    
    if (!teamMember) {
      throw new BadRequestException(
        'OrgMemberGuard must be applied before RoleGuard. User membership not validated.',
      );
    }

    const userRole = teamMember.role;
    const hasPermission = this.checkRolePermission(userRole, requiredRole);

    if (!hasPermission) {
      throw new ForbiddenException(
        `This action requires ${requiredRole} role or higher. Your role: ${userRole}`,
      );
    }

    return true;
  }

  private checkRolePermission(
    userRole: 'owner' | 'admin' | 'member',
    requiredRole: 'owner' | 'admin' | 'member',
  ): boolean {
    const roleHierarchy = {
      owner: 3,
      admin: 2,
      member: 1,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }
}
