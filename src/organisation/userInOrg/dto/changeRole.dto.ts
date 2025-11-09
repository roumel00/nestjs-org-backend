import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}