import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsNotEmpty()
  otp: string;
}

