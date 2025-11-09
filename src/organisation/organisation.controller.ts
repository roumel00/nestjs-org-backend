import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { OrganisationService } from './organisation.service.js';
import { SwitchOrganisationDto } from './dto/switchOrganisation.dto.js';

@Controller('organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get()
  getMyOrganisations(@Session() session: UserSession) {
    // No guard needed - just requires authentication (via @Session())
    return this.organisationService.getUserOrganisations(session.user.id);
  }

  @Post('switch')
  async switchOrganisation(
    @Session() session: UserSession,
    @Body() body: SwitchOrganisationDto,
    @Req() req: Request,
  ) {

    const newOrgId = await this.organisationService.switchOrganisation(
      session.user.id,
      body.orgId,
      req,
    );

    return { orgId: newOrgId };
  }
}
