import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetTeamMembersService } from './getTeamMembers.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';

@Controller('workspace/team')
export class GetTeamMembersController {
  constructor(
    private readonly getTeamMembersService: GetTeamMembersService,
  ) {}

  @Get('fetch')
  @UseGuards(WorkspaceMemberGuard)
  async getTeamMembers(
    @CurrentWorkspace() workspaceId: string,
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    const pageNum = Math.max(1, parseInt(page || '1', 10) || 1);
    return this.getTeamMembersService.getTeamMembers(
      workspaceId,
      pageNum,
      search || undefined,
      sortBy || undefined,
      sortOrder === 'desc' ? 'desc' : 'asc',
    );
  }
}
