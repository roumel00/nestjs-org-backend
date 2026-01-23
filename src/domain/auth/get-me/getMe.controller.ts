import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetMeService } from './getMe.service.js';

@Controller('user')
export class GetMeController {
  constructor(private readonly getMeService: GetMeService) {}

  @Get('me')
  getMe(@Session() session: UserSession) {
    return this.getMeService.getMe(session);
  }
}
