export type VerifyResetPasswordRequest = {
  email: string;
  otp: string;
};

export type VerifyResetPasswordResponse = {
  success: boolean;
};
