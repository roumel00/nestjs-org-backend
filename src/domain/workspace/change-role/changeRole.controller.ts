import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChangeRoleService } from './changeRole.service.js';
import { ChangeRoleRequest } from './changeRole.validator.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';
import { CurrentUser } from '@domain/workspace/_decorators/currentUser.decorator.js';

@Controller('workspaces/team')
export class ChangeRoleController {
  constructor(private readonly changeRoleService: ChangeRoleService) {}

  @Post('changeRole')
  @UseGuards(WorkspaceMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async changeRole(
    @CurrentWorkspace() workspaceId: string,
    @CurrentUser() user: { id: string; name: string | null },
    @Body() body: ChangeRoleRequest,
  ) {
    return this.changeRoleService.changeRole(workspaceId, body.userId, body.role, user);
  }
}
