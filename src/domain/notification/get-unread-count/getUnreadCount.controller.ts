import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUnreadCountService } from './getUnreadCount.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class GetUnreadCountController {
  constructor(private readonly getUnreadCountService: GetUnreadCountService) {}

  @Get('unread-count/fetch')
  @UseGuards(WorkspaceMemberGuard)
  async getUnreadCount(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
  ) {
    return this.getUnreadCountService.getUnreadCount(user.id, workspaceId);
  }
}
