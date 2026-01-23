import { Controller, Post, Body } from '@nestjs/common';
import { OptionalAuth, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { VerifyEmailService } from './verifyEmail.service.js';
import { VerifyEmailRequest } from './verifyEmail.dto.js';

@Controller('verify')
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @Post()
  @OptionalAuth()
  async verify(@Session() session: UserSession, @Body() body: VerifyEmailRequest) {
    return this.verifyEmailService.verifyEmail(session, body.otp);
  }
}
