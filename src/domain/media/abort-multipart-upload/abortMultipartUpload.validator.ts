import { IsString, IsNotEmpty } from 'class-validator';

export class AbortMultipartUploadRequest {
  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @IsString()
  @IsNotEmpty()
  key: string;
}
