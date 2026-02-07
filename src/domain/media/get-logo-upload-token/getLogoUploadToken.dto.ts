import { IsString, IsNotEmpty } from 'class-validator';

export class GetLogoUploadTokenRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;
}

export class GetLogoUploadTokenResponse {
  token: string;
  filename: string;
  urlPath: string;
}
