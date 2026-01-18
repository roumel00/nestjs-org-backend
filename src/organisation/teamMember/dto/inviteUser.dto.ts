import { IsString, IsNotEmpty } from 'class-validator';

export class InviteUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

