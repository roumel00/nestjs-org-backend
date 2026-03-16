import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeRoleRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
