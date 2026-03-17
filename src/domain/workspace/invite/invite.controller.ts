import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { InviteService } from './invite.service.js';
import { InviteRequest } from './invite.validator.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { UserThrottlerGuard } from '@common/guards/userThrottler.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('workspace/team')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('invite')
  @UseGuards(WorkspaceMemberGuard, RoleGuard, UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(60), limit: 50 } })
  @RequiredRole('admin')
  async invite(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Body() body: InviteRequest,
  ) {
    return this.inviteService.invite(body.email, workspaceId, user);
  }
}
