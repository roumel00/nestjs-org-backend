import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetTeamOverviewService } from './getTeamOverview.service.js';
import { WorkspaceMemberGuard } from '@common/guards/workspaceMember.guard.js';
import { CurrentWorkspace} from '@domain/workspace/_decorators/currentWorkspace.decorator.js';

@Controller('workspaces/team/overview')
export class GetTeamOverviewController {
  constructor(
    private readonly getTeamOverviewService: GetTeamOverviewService,
  ) {}

  @Get()
  @UseGuards(WorkspaceMemberGuard)
  async getTeamOverview(@CurrentWorkspace() workspaceId: string) {
    return this.getTeamOverviewService.getTeamOverview(workspaceId);
  }
}
