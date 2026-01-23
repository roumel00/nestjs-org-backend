import { IsString, IsNotEmpty } from 'class-validator';

export class InviteUserRequest {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

