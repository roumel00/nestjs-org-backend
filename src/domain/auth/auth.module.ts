import { Module } from '@nestjs/common';
import { ForgotPasswordModule } from './forgot-password/forgotPassword.module.js';
import { VerifyResetPasswordModule } from './verify-reset-password/verifyResetPassword.module.js';
import { ResetPasswordModule } from './reset-password/resetPassword.module.js';
import { VerifyEmailModule } from './verify-email/verifyEmail.module.js';
import { ResendVerificationModule } from './resend-verification/resendVerification.module.js';

@Module({
  imports: [
    ForgotPasswordModule,
    VerifyResetPasswordModule,
    ResetPasswordModule,
    VerifyEmailModule,
    ResendVerificationModule,
  ],
})
export class AuthModule {}
