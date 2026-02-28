import { Controller, Post, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ClearOrgService } from './clearOrg.service.js';

@Controller('organisations/team')
export class ClearOrgController {
  constructor(private readonly clearOrgService: ClearOrgService) {}

  @Post('clear')
  async clearOrganisation(
    @Session() _session: UserSession,
    @Req() req: Request,
  ) {
    await this.clearOrgService.clearOrganisation(req);
    return { success: true };
  }
}
