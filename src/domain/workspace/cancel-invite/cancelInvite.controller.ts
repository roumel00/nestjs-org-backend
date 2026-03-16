import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CancelInviteService } from './cancelInvite.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentWorkspace} from '../_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '../_decorators/currentUser.decorator.js';
import { CancelInviteRequest } from './cancelInvite.validator.js';

@Controller('workspaces/team')
export class CancelInviteController {
  constructor(private readonly cancelInviteService: CancelInviteService) {}

  @Post('cancelInvite')
  @UseGuards(WorkspaceMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async cancelInvite(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Body() body: CancelInviteRequest,
  ) {
    return this.cancelInviteService.cancelInvite(workspaceId, body.email, user);
  }
}
