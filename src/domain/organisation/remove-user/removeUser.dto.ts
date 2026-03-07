import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveUserRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class RemoveUserResponse {
  message: string;
}
