import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { PasswordService } from './password.service.js';
import { ForgotPasswordRequest } from './dto/forgotPassword.dto.js';
import { VerifyResetPasswordRequest } from './dto/verifyResetPassword.dto.js';
import { ResetPasswordRequest } from './dto/resetPassword.dto.js';
import { PasswordThrottlerGuard } from '../../common/guards/passwordThrottler.guard.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  @UseGuards(PasswordThrottlerGuard)
  @Throttle({ default: { ttl: minutes(5), limit: 1 } })
  @AllowAnonymous()
  async forgotPassword(@Body() body: ForgotPasswordRequest) {
    return this.passwordService.forgotPassword(body.email);
  }

  @Post('verify-reset')
  @AllowAnonymous()
  async verifyResetPassword(@Body() body: VerifyResetPasswordRequest) {
    return this.passwordService.verifyResetPassword(body.email, body.otp);
  }

  @Post('reset')
  @AllowAnonymous()
  async resetPassword(@Body() body: ResetPasswordRequest) {
    return this.passwordService.resetPassword(
      body.email,
      body.otp,
      body.newPassword,
      body.confirmPassword
    );
  }
}
