import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetWorkspacesService } from './getWorkspaces.service.js';

@Controller('workspaces')
export class GetWorkspacesController {
  constructor(private readonly getWorkspacesService: GetWorkspacesService) {}

  @Get()
  getMyWorkspaces(@Session() session: UserSession) {
    return this.getWorkspacesService.getUserWorkspaces(session.user.id);
  }
}
