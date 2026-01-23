import { Injectable } from '@nestjs/common';
import { auth } from '../../../config/betterAuth.js';

@Injectable()
export class ForgotPasswordService {
  async forgotPassword(email: string) {
    const response = await auth.api.forgetPasswordEmailOTP({
      body: {
        email: email,
      },
    });

    return response;
  }
}
