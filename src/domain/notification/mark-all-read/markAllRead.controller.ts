import { Controller, Patch, UseGuards } from '@nestjs/common';
import { MarkAllReadService } from './markAllRead.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';
import { CurrentUser } from '@domain/organisation/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class MarkAllReadController {
  constructor(private readonly markAllReadService: MarkAllReadService) {}

  @Patch('read-all')
  @UseGuards(OrgMemberGuard)
  async markAllRead(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: { id: string; name: string | null },
  ) {
    return this.markAllReadService.markAllRead(user.id, orgId);
  }
}
