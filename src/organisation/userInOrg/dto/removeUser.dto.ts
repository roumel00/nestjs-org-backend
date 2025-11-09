import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}