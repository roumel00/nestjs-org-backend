import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../../config/auth.js';

@Injectable()
export class VerifyService {
  async verifyUser(session: UserSession, otp: string) {
    const response = await auth.api.verifyEmailOTP({
      body: {
        email: session.user.email,
        otp: otp,
      },
    });

    return response;
  }

  async resendVerificationEmail(session: UserSession) {
    const response = await auth.api.sendVerificationOTP({
      body: {
        email: session.user.email,
        type: 'email-verification',
      },
    });

    return response;
  }
}
