import { IsString, IsNotEmpty, IsIn, IsOptional, IsNumber, Min } from 'class-validator';

export class InitiateMultipartUploadRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsNumber()
  @Min(1)
  fileSize: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['avatar', 'logo', 'general', 'video'])
  fileType: 'avatar' | 'logo' | 'general' | 'video';

  @IsString()
  @IsOptional()
  orgId?: string;
}
