import { IsString, IsNotEmpty } from 'class-validator';

export class CancelInviteRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class CancelInviteResponse {
  message: string;
}
