import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ForgotPasswordService } from './forgotPassword.service.js';
import { ForgotPasswordRequest } from './forgotPassword.dto.js';
import { PasswordThrottlerGuard } from '@common/guards/passwordThrottler.guard.js';

@Controller('password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot')
  @UseGuards(PasswordThrottlerGuard)
  @Throttle({ default: { ttl: minutes(5), limit: 2 } })
  @AllowAnonymous()
  async forgotPassword(@Body() body: ForgotPasswordRequest) {
    return this.forgotPasswordService.forgotPassword(body.email);
  }
}
