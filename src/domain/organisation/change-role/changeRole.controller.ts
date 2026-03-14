import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChangeRoleService } from './changeRole.service.js';
import { ChangeRoleRequest } from './changeRole.validator.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';
import { CurrentUser } from '@domain/organisation/_decorators/currentUser.decorator.js';

@Controller('organisations/team')
export class ChangeRoleController {
  constructor(private readonly changeRoleService: ChangeRoleService) {}

  @Post('changeRole')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async changeRole(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Body() body: ChangeRoleRequest,
  ) {
    return this.changeRoleService.changeRole(orgId, body.userId, body.role, user);
  }
}
