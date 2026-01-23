import { Module } from '@nestjs/common';
import { VerifyResetPasswordController } from './verifyResetPassword.controller.js';
import { VerifyResetPasswordService } from './verifyResetPassword.service.js';

@Module({
  controllers: [VerifyResetPasswordController],
  providers: [VerifyResetPasswordService],
})
export class VerifyResetPasswordModule {}
