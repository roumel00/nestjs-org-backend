import { Controller, Post, UseGuards } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Throttle, minutes } from '@nestjs/throttler';
import { ResendVerificationService } from './resendVerification.service.js';
import { UserThrottlerGuard } from '../../../common/guards/userThrottler.guard.js';

@Controller('verify')
export class ResendVerificationController {
  constructor(private readonly resendVerificationService: ResendVerificationService) {}

  @Post('resend')
  @UseGuards(UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(5), limit: 1 } })
  async resendVerification(@Session() session: UserSession) {
    return this.resendVerificationService.resendVerificationEmail(session);
  }
}
