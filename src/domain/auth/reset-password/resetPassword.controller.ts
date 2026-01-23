import { Controller, Post, Body } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ResetPasswordService } from './resetPassword.service.js';
import { ResetPasswordRequest } from './resetPassword.dto.js';

@Controller('password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('reset')
  @AllowAnonymous()
  async resetPassword(@Body() body: ResetPasswordRequest) {
    return this.resetPasswordService.resetPassword(
      body.email,
      body.otp,
      body.newPassword,
      body.confirmPassword
    );
  }
}
