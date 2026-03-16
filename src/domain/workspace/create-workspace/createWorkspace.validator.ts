import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkspaceRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsOptional()
  logo?: string;
}
