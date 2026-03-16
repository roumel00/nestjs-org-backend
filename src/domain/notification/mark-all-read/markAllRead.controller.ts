import { Controller, Patch, UseGuards } from '@nestjs/common';
import { MarkAllReadService } from './markAllRead.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class MarkAllReadController {
  constructor(private readonly markAllReadService: MarkAllReadService) {}

  @Patch('read-all')
  @UseGuards(WorkspaceMemberGuard)
  async markAllRead(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
  ) {
    return this.markAllReadService.markAllRead(user.id, workspaceId);
  }
}
