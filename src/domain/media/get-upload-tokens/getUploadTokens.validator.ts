import { IsString, IsNotEmpty, IsIn, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FileUploadRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;
}

export class GetUploadTokensRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileUploadRequest)
  files: FileUploadRequest[];

  @IsString()
  @IsNotEmpty()
  @IsIn(['avatar', 'logo', 'general'])
  fileType: 'avatar' | 'logo' | 'general';

  @IsString()
  @IsOptional()
  workspaceId?: string;
}
