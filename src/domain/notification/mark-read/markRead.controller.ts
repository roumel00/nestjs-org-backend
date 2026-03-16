import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { MarkReadService } from './markRead.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('notifications')
export class MarkReadController {
  constructor(private readonly markReadService: MarkReadService) {}

  @Patch(':id/read')
  @UseGuards(WorkspaceMemberGuard)
  async markRead(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; name: string | null },
  ) {
    return this.markReadService.markRead(id, user.id);
  }
}
