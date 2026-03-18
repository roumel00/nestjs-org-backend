import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetCurrentWorkspaceService } from './getCurrentWorkspace.service.js';

@Controller('workspace/team')
export class GetCurrentWorkspaceController {
  constructor(private readonly getCurrentWorkspaceService: GetCurrentWorkspaceService) {}

  @Get('fetch-current')
  getCurrentWorkspaces(@Session() session: UserSession) {
    return this.getCurrentWorkspaceService.getCurrentWorkspace(session);
  }
}
