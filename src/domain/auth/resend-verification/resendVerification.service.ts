import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../../../config/betterAuth.js';

@Injectable()
export class ResendVerificationService {
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
