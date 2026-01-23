import { IsString, IsNotEmpty } from 'class-validator';

export class InviteRequest {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
