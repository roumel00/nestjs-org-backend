import { Controller, Get } from '@nestjs/common';
import { OptionalAuth, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { OptionalService } from './optional.service.js';

@Controller('user')
export class OptionalController {
  constructor(private readonly optionalService: OptionalService) {}

  @Get('optional')
  @OptionalAuth()
  optional(@Session() session?: UserSession) {
    return this.optionalService.optional(session);
  }
}
