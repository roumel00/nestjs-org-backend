import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller.js';
import { PasswordService } from './password.service.js';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
