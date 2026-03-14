export type ResetPasswordRequest = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  success: boolean;
};
