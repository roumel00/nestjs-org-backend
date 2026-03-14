import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { UpdateOrgDetailsService } from './updateOrgDetails.service.js';
import { UpdateOrgDetailsRequest } from './updateOrgDetails.validator.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('organisations')
export class UpdateOrgDetailsController {
  constructor(private readonly updateOrgDetailsService: UpdateOrgDetailsService) {}

  @Patch('details')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async updateOrgDetails(@CurrentOrg() orgId: string, @Body() body: UpdateOrgDetailsRequest) {
    return this.updateOrgDetailsService.updateOrgDetails(orgId, body);
  }
}
