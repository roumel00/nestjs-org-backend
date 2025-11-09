import { BadRequestException, Injectable } from '@nestjs/common';
import { auth } from '../../config/auth.js';

@Injectable()
export class PasswordService {
  async forgotPassword(email: string) {
    const response = await auth.api.forgetPasswordEmailOTP({
      body: {
        email: email,
      },
    });

    return response;
  }

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

  async resetPassword(email: string, otp: string, newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const response = await auth.api.resetPasswordEmailOTP({
      body: {
        email: email,
        otp: otp,
        password: newPassword,
      },
    });

    return response;
  }
}
