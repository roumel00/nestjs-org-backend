import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyEmailRequest {
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class VerifyEmailResponse {
  success: boolean;
}
