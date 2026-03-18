import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetNotificationsService } from './getNotifications.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class GetNotificationsController {
  constructor(private readonly getNotificationsService: GetNotificationsService) {}

  @Get('fetch-notifications')
  @UseGuards(WorkspaceMemberGuard)
  async getNotifications(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.getNotificationsService.getNotifications(
      user.id,
      workspaceId,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }
}
