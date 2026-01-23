import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChangeRoleService } from './changeRole.service.js';
import { ChangeRoleRequest } from './changeRole.dto.js';
import { OrgMemberGuard } from '../../../common/guards/orgMember.guard.js';
import { RoleGuard } from '../../../common/guards/role.guard.js';
import { RequiredRole } from '../../../common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../_decorators/currentOrg.decorator.js';

@Controller('organisations/team')
export class ChangeRoleController {
  constructor(private readonly changeRoleService: ChangeRoleService) {}

  @Post('changeRole')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async changeRole(@CurrentOrg() orgId: string, @Body() body: ChangeRoleRequest) {
    return this.changeRoleService.changeRole(orgId, body.userId, body.role);
  }
}
