import { Controller, Get, UseGuards } from '@nestjs/common';
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
  async getTeamMembers(@CurrentOrg() orgId: string) {
    return this.getTeamMembersService.getTeamMembers(orgId);
  }
}
