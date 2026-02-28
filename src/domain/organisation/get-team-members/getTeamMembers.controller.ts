import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetTeamMembersService } from './getTeamMembers.service.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('organisations/team')
export class GetTeamMembersController {
  constructor(
    private readonly getTeamMembersService: GetTeamMembersService,
  ) {}

  @Get()
  @UseGuards(OrgMemberGuard)
  async getTeamMembers(
    @CurrentOrg() orgId: string,
    @Query('page') page?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = Math.max(1, parseInt(page || '1', 10) || 1);
    return this.getTeamMembersService.getTeamMembers(
      orgId,
      pageNum,
      search || undefined,
    );
  }
}
