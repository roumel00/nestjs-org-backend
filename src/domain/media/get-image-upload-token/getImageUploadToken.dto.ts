import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class GetImageUploadTokenRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['avatar', 'logo'])
  fileType: string;
}

export class GetImageUploadTokenResponse {
  token: string;
  filename: string;
  urlPath: string;
}
