import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrgRequest {
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

export class CreateOrgResponse {
  _id: string;
  owner: string;
  name: string;
  timezone: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
}
