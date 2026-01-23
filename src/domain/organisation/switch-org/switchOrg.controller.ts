import { Controller, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { SwitchOrgService } from './switchOrg.service.js';
import { SwitchOrgRequest } from './switchOrg.dto.js';

@Controller('organisations/team')
export class SwitchOrgController {
  constructor(private readonly switchOrgService: SwitchOrgService) {}

  @Post('switch')
  async switchOrganisation(
    @Session() session: UserSession,
    @Body() body: SwitchOrgRequest,
    @Req() req: Request,
  ) {
    const newOrgId = await this.switchOrgService.switchOrganisation(
      session.user.id,
      body.orgId,
      req,
    );

    return { orgId: newOrgId };
  }
}
