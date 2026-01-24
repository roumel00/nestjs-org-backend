import { IsString, IsNotEmpty, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FileUploadRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;
}

export class GetImageUploadTokensRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileUploadRequest)
  files: FileUploadRequest[];

  @IsString()
  @IsNotEmpty()
  @IsIn(['avatar', 'logo'])
  fileType: string;
}

export class ImageUploadToken {
  token: string;
  filename: string;
  urlPath: string;
}

export class GetImageUploadTokensResponse {
  tokens: ImageUploadToken[];
}
