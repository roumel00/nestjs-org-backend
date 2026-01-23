import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}