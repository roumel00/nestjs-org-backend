import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMultipartUploadCommand, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import type {
  InitiateMultipartUploadRequest,
  InitiateMultipartUploadResponse,
} from './initiateMultipartUpload.types.js';

const PART_SIZE = 10 * 1024 * 1024; // 10 MB

@Injectable()
export class InitiateMultipartUploadService {
  private getKeyPrefix(fileType: string, workspaceId?: string): string {
    switch (fileType) {
      case 'avatar':
        return 'avatars/';
      case 'logo':
        return 'logos/';
      case 'video':
        if (!workspaceId) {
          throw new BadRequestException('workspaceId is required for video uploads');
        }
        return `${workspaceId}/videos/`;
      case 'general':
        if (!workspaceId) {
          throw new BadRequestException('workspaceId is required for general file uploads');
        }
        return `${workspaceId}/`;
      default:
        throw new BadRequestException(`Invalid fileType: ${fileType}`);
    }
  }

  async initiateMultipartUpload(
    request: InitiateMultipartUploadRequest,
  ): Promise<InitiateMultipartUploadResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const keyPrefix = this.getKeyPrefix(request.fileType, request.workspaceId);
    const fileExtension = extension(request.mimetype);
    const filename = `${randomUUID()}${fileExtension ? `.${fileExtension}` : ''}`;
    const key = `${keyPrefix}${filename}`;

    const createCommand = new CreateMultipartUploadCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: request.mimetype,
    });

    const { UploadId } = await s3Client.send(createCommand);

    if (!UploadId) {
      throw new BadRequestException('Failed to initiate multipart upload');
    }

    const totalParts = Math.ceil(request.fileSize / PART_SIZE);

    const partPromises = Array.from({ length: totalParts }, async (_, i) => {
      const partNumber = i + 1;
      const command = new UploadPartCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        UploadId,
        PartNumber: partNumber,
      });

      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return { partNumber, url };
    });

    const parts = await Promise.all(partPromises);

    return { uploadId: UploadId, key, parts };
  }
}
