import { Controller, Post, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ClearWorkspaceService } from './clearWorkspace.service.js';

@Controller('workspace/team')
export class ClearWorkspaceController {
  constructor(private readonly clearWorkspaceService: ClearWorkspaceService) {}

  @Post('clear')
  async clearWorkspace(
    @Session() _session: UserSession,
    @Req() req: Request,
  ) {
    await this.clearWorkspaceService.clearWorkspace(req);
    return { success: true };
  }
}
