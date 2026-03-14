import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CompletedPart {
  @IsNumber()
  @Min(1)
  partNumber: number;

  @IsString()
  @IsNotEmpty()
  etag: string;
}

export class CompleteMultipartUploadRequest {
  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompletedPart)
  parts: CompletedPart[];
}
