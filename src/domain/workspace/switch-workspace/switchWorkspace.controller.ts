import { Controller, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { SwitchWorkspaceService } from './switchWorkspace.service.js';
import { SwitchWorkspaceRequest } from './switchWorkspace.validator.js';

@Controller('workspace/team')
export class SwitchWorkspaceController {
  constructor(private readonly switchWorkspaceService: SwitchWorkspaceService) {}

  @Post('switch')
  async switchWorkspace(
    @Session() session: UserSession,
    @Body() body: SwitchWorkspaceRequest,
    @Req() req: Request,
  ) {
    const newWorkspaceId = await this.switchWorkspaceService.switchWorkspace(
      session.user.id,
      body.workspaceId,
      req,
    );

    return { workspaceId: newWorkspaceId };
  }
}
