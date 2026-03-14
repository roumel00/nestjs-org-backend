import { Injectable, BadRequestException } from '@nestjs/common';
import { CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import type {
  CompleteMultipartUploadRequest,
  CompleteMultipartUploadResponse,
} from './completeMultipartUpload.types.js';

@Injectable()
export class CompleteMultipartUploadService {
  async completeMultipartUpload(
    request: CompleteMultipartUploadRequest,
  ): Promise<CompleteMultipartUploadResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const command = new CompleteMultipartUploadCommand({
      Bucket: S3_BUCKET_NAME,
      Key: request.key,
      UploadId: request.uploadId,
      MultipartUpload: {
        Parts: request.parts
          .sort((a, b) => a.partNumber - b.partNumber)
          .map((part) => ({
            PartNumber: part.partNumber,
            ETag: part.etag,
          })),
      },
    });

    await s3Client.send(command);

    return { urlPath: request.key };
  }
}
