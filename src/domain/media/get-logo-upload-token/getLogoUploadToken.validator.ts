import { IsString, IsNotEmpty } from 'class-validator';

export class GetLogoUploadTokenRequest {
  @IsString()
  @IsNotEmpty()
  mimetype: string;
}
