import { Injectable, BadRequestException } from '@nestjs/common';
import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import type {
  AbortMultipartUploadRequest,
  AbortMultipartUploadResponse,
} from './abortMultipartUpload.types.js';

@Injectable()
export class AbortMultipartUploadService {
  async abortMultipartUpload(
    request: AbortMultipartUploadRequest,
  ): Promise<AbortMultipartUploadResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: S3_BUCKET_NAME,
      Key: request.key,
      UploadId: request.uploadId,
    });

    await s3Client.send(command);

    return { success: true };
  }
}
