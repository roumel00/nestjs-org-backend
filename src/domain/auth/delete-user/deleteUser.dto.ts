import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteUserRequest {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  secret: string;
}

export class DeleteUserResponse {
  success: boolean;
}
