import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ForgotPasswordResponse {
  success: boolean;
}
