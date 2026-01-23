import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyUserRequest {
  @IsString()
  @IsNotEmpty()
  otp: string;
}

