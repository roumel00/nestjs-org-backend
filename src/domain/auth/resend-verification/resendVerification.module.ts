import { Module } from '@nestjs/common';
import { ResendVerificationController } from './resendVerification.controller.js';
import { ResendVerificationService } from './resendVerification.service.js';

@Module({
  controllers: [ResendVerificationController],
  providers: [ResendVerificationService],
})
export class ResendVerificationModule {}
