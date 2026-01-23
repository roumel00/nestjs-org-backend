import { Controller, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreateOrgService } from './createOrg.service.js';
import { CreateOrgRequest } from './createOrg.dto.js';

@Controller('organisations')
export class CreateOrgController {
  constructor(private readonly createOrgService: CreateOrgService) {}

  @Post()
  async createOrganisation(
    @Session() session: UserSession,
    @Body() body: CreateOrgRequest,
    @Req() req: Request,
  ) {
    return this.createOrgService.createOrganisation(
      session.user.id,
      session.user.email,
      body,
      req,
    );
  }
}
