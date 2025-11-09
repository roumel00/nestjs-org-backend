import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { PasswordModule } from './password/password.module.js';
import { VerifyModule } from './verify/verify.module.js';

@Module({
  imports: [PasswordModule, VerifyModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
