import { Module } from '@nestjs/common';
import { VerifyEmailController } from './verifyEmail.controller.js';
import { VerifyEmailService } from './verifyEmail.service.js';

@Module({
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService],
})
export class VerifyEmailModule {}
