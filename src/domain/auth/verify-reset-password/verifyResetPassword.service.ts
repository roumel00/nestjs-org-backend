import { Injectable } from '@nestjs/common';
import { auth } from '../../../config/betterAuth.js';

@Injectable()
export class VerifyResetPasswordService {
  async verifyResetPassword(email: string, otp: string) {
    const response = await auth.api.checkVerificationOTP({
      body: {
        email: email,
        type: 'forget-password',
        otp: otp,
      },
    });

    return response;
  }
}
