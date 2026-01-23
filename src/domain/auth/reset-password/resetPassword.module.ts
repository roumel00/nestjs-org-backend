import { Module } from '@nestjs/common';
import { ResetPasswordController } from './resetPassword.controller.js';
import { ResetPasswordService } from './resetPassword.service.js';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
