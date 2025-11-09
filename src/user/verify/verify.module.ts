import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller.js';
import { VerifyService } from './verify.service.js';

@Module({
  controllers: [VerifyController],
  providers: [VerifyService],
  exports: [VerifyService],
})
export class VerifyModule {}

