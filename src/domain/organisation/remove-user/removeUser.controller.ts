import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RemoveUserService } from './removeUser.service.js';
import { RemoveUserRequest } from './removeUser.dto.js';
import { OrgMemberGuard } from '../../../common/guards/orgMember.guard.js';
import { RoleGuard } from '../../../common/guards/role.guard.js';
import { RequiredRole } from '../../../common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../_decorators/currentOrg.decorator.js';

@Controller('organisations/team')
export class RemoveUserController {
  constructor(private readonly removeUserService: RemoveUserService) {}

  @Post('removeUser')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async removeUser(@CurrentOrg() orgId: string, @Body() body: RemoveUserRequest) {
    return this.removeUserService.removeUser(orgId, body.userId);
  }
}
