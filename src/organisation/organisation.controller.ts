import { Controller, Post, Body, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { OrganisationService } from './organisation.service.js';
import { CreateOrganisationDto } from './dto/createOrganisation.dto.js';

@Controller('organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  async createOrganisation(
    @Session() session: UserSession,
    @Body() body: CreateOrganisationDto,
    @Req() req: Request,
  ) {
    return this.organisationService.createOrganisation(
      session.user.id,
      session.user.email,
      body,
      req,
    );
  }
}
