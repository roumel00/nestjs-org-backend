import { IsString, IsNotEmpty } from 'class-validator';

export class CancelInviteRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}
