import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CancelInviteService } from './cancelInvite.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../_decorators/currentOrg.decorator.js';
import { CancelInviteRequest } from './cancelInvite.dto.js';

@Controller('organisations/team')
export class CancelInviteController {
  constructor(private readonly cancelInviteService: CancelInviteService) {}

  @Post('cancelInvite')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async cancelInvite(@CurrentOrg() orgId: string, @Body() body: CancelInviteRequest) {
    return this.cancelInviteService.cancelInvite(orgId, body.email);
  }
}
