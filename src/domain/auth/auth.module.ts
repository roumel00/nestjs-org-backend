import { Module } from '@nestjs/common';
import { GetMeModule } from './get-me/getMe.module.js';
import { PublicModule } from './public/public.module.js';
import { OptionalModule } from './optional/optional.module.js';
import { DeleteUserModule } from './delete-user/deleteUser.module.js';
import { ForgotPasswordModule } from './forgot-password/forgotPassword.module.js';
import { VerifyResetPasswordModule } from './verify-reset-password/verifyResetPassword.module.js';
import { ResetPasswordModule } from './reset-password/resetPassword.module.js';
import { VerifyEmailModule } from './verify-email/verifyEmail.module.js';
import { ResendVerificationModule } from './resend-verification/resendVerification.module.js';

@Module({
  imports: [
    GetMeModule,
    PublicModule,
    OptionalModule,
    DeleteUserModule,
    ForgotPasswordModule,
    VerifyResetPasswordModule,
    ResetPasswordModule,
    VerifyEmailModule,
    ResendVerificationModule,
  ],
})
export class AuthModule {}
