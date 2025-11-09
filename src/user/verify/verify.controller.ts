import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Throttle, minutes } from '@nestjs/throttler';
import { VerifyService } from './verify.service.js';
import { VerifyUserDto } from './dto/verifyEmail.dto.js';
import { UserThrottlerGuard } from '../../common/guards/userThrottler.guard.js';

@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  async verify(@Session() session: UserSession, @Body() body: VerifyUserDto) {
    return this.verifyService.verifyUser(session, body.otp);
  }

  @Post('resend')
  @UseGuards(UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(5), limit: 1 } })
  async resendVerification(@Session() session: UserSession) {
    return this.verifyService.resendVerificationEmail(session);
  }
}

