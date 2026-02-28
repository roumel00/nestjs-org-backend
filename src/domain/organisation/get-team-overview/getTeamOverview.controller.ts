import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetTeamOverviewService } from './getTeamOverview.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('organisations/team/overview')
export class GetTeamOverviewController {
  constructor(
    private readonly getTeamOverviewService: GetTeamOverviewService,
  ) {}

  @Get()
  @UseGuards(OrgMemberGuard)
  async getTeamOverview(@CurrentOrg() orgId: string) {
    return this.getTeamOverviewService.getTeamOverview(orgId);
  }
}
