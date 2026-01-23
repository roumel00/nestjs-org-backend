import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { CancelInviteService } from './cancelInvite.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';

@Controller('organisations/team')
export class CancelInviteController {
  constructor(private readonly cancelInviteService: CancelInviteService) {}

  @Delete('cancel/:inviteId')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async cancelInvite(@Param('inviteId') inviteId: string) {
    return this.cancelInviteService.cancelInvite(inviteId);
  }
}
