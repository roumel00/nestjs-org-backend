import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class VerifyEmailService {
  async verifyEmail(session: UserSession, otp: string) {
    const response = await auth.api.verifyEmailOTP({
      body: {
        email: session.user.email,
        otp: otp,
      },
    });

    return response;
  }
}
