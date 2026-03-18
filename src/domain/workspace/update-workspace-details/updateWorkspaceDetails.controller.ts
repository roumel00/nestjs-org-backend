import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { UpdateWorkspaceDetailsService } from './updateWorkspaceDetails.service.js';
import { UpdateWorkspaceDetailsRequest } from './updateWorkspaceDetails.validator.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';

@Controller('workspace')
export class UpdateWorkspaceDetailsController {
  constructor(private readonly updateWorkspaceDetailsService: UpdateWorkspaceDetailsService) {}

  @Patch('update-details')
  @UseGuards(WorkspaceMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async updateWorkspaceDetails(@CurrentWorkspace() workspaceId: string, @Body() body: UpdateWorkspaceDetailsRequest) {
    return this.updateWorkspaceDetailsService.updateWorkspaceDetails(workspaceId, body);
  }
}
