import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrgDetailsRequest {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logo?: string;
}
