import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgotPassword.controller.js';
import { ForgotPasswordService } from './forgotPassword.service.js';

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
