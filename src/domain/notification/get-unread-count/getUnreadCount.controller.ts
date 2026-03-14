import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUnreadCountService } from './getUnreadCount.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';
import { CurrentUser } from '@domain/organisation/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class GetUnreadCountController {
  constructor(private readonly getUnreadCountService: GetUnreadCountService) {}

  @Get('unread-count')
  @UseGuards(OrgMemberGuard)
  async getUnreadCount(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: { id: string; name: string | null },
  ) {
    return this.getUnreadCountService.getUnreadCount(user.id, orgId);
  }
}
