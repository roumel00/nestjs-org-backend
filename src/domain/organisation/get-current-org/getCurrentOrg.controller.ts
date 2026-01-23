import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetCurrentOrgService } from './getCurrentOrg.service.js';

@Controller('organisations/team')
export class GetCurrentOrgController {
  constructor(private readonly getCurrentOrgService: GetCurrentOrgService) {}

  @Get('currentOrg')
  getCurrentOrganisations(@Session() session: UserSession) {
    return this.getCurrentOrgService.getCurrentOrganisation(session);
  }
}
