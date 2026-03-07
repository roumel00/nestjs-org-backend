import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetOrgDetailsService } from './getOrgDetails.service.js';

@Controller('organisations')
export class GetOrgDetailsController {
  constructor(private readonly getOrgDetailsService: GetOrgDetailsService) {}

  @Get('details')
  getOrgDetails(@Session() session: UserSession) {
    return this.getOrgDetailsService.getOrgDetails(session);
  }
}
