import { BadRequestException, Injectable } from '@nestjs/common';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class ResetPasswordService {
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
