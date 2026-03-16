import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RemoveUserService } from './removeUser.service.js';
import { RemoveUserRequest } from './removeUser.validator.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('workspaces/team')
export class RemoveUserController {
  constructor(private readonly removeUserService: RemoveUserService) {}

  @Post('removeUser')
  @UseGuards(WorkspaceMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async removeUser(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Body() body: RemoveUserRequest,
  ) {
    return this.removeUserService.removeUser(workspaceId, body.userId, user);
  }
}
