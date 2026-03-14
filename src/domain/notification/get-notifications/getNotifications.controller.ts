import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetNotificationsService } from './getNotifications.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';
import { CurrentUser } from '@domain/organisation/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class GetNotificationsController {
  constructor(private readonly getNotificationsService: GetNotificationsService) {}

  @Get()
  @UseGuards(OrgMemberGuard)
  async getNotifications(
    @CurrentOrg() orgId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.getNotificationsService.getNotifications(
      user.id,
      orgId,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }
}
