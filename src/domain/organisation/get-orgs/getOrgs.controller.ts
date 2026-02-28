import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetOrgsService } from './getOrgs.service.js';

@Controller('organisations')
export class GetOrgsController {
  constructor(private readonly getOrgsService: GetOrgsService) {}

  @Get()
  getMyOrganisations(@Session() session: UserSession) {
    return this.getOrgsService.getUserOrganisations(session.user.id);
  }
}
