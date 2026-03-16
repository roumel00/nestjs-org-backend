import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetWorkspaceDetailsService } from './getWorkspaceDetails.service.js';

@Controller('workspaces')
export class GetWorkspaceDetailsController {
  constructor(private readonly getWorkspaceDetailsService: GetWorkspaceDetailsService) {}

  @Get('details')
  getWorkspaceDetails(@Session() session: UserSession) {
    return this.getWorkspaceDetailsService.getWorkspaceDetails(session);
  }
}
