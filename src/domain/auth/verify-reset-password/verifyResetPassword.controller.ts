import { Controller, Post, Body } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { VerifyResetPasswordService } from './verifyResetPassword.service.js';
import { VerifyResetPasswordRequest } from './verifyResetPassword.dto.js';

@Controller('password')
export class VerifyResetPasswordController {
  constructor(private readonly verifyResetPasswordService: VerifyResetPasswordService) {}

  @Post('verify-reset')
  @AllowAnonymous()
  async verifyResetPassword(@Body() body: VerifyResetPasswordRequest) {
    return this.verifyResetPasswordService.verifyResetPassword(body.email, body.otp);
  }
}
