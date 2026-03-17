import { Controller, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreateWorkspaceService } from './createWorkspace.service.js';
import { CreateWorkspaceRequest } from './createWorkspace.validator.js';

@Controller('workspace')
export class CreateWorkspaceController {
  constructor(private readonly createWorkspaceService: CreateWorkspaceService) {}

  @Post('create')
  async createWorkspace(
    @Session() session: UserSession,
    @Body() body: CreateWorkspaceRequest,
    @Req() req: Request,
  ) {
    return this.createWorkspaceService.createWorkspace(
      session.user.id,
      session.user.email,
      body,
      req,
    );
  }
}
