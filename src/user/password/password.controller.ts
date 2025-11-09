import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { PasswordService } from './password.service.js';
import { ForgotPasswordDto } from './dto/forgotPassword.dto.js';
import { VerifyResetPasswordDto } from './dto/verifyResetPassword.dto.js';
import { ResetPasswordDto } from './dto/resetPassword.dto.js';
import { PasswordThrottlerGuard } from '../../common/guards/passwordThrottler.guard.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  @UseGuards(PasswordThrottlerGuard)
  @Throttle({ default: { ttl: minutes(5), limit: 1 } })
  @AllowAnonymous()
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(body.email);
  }

  @Post('verify-reset')
  @AllowAnonymous()
  async verifyResetPassword(@Body() body: VerifyResetPasswordDto) {
    return this.passwordService.verifyResetPassword(body.email, body.otp);
  }

  @Post('reset')
  @AllowAnonymous()
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.passwordService.resetPassword(
      body.email,
      body.otp,
      body.newPassword,
      body.confirmPassword
    );
  }
}
