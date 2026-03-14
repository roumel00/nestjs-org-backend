import { Injectable, BadRequestException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import type { GetUploadTokensRequest, GetUploadTokensResponse } from './getUploadTokens.types.js';

@Injectable()
export class GetUploadTokensService {
  private getKeyPrefix(fileType: string, orgId?: string): string {
    switch (fileType) {
      case 'avatar':
        return 'avatars/';
      case 'logo':
        return 'logos/';
      case 'general':
        if (!orgId) {
          throw new BadRequestException('orgId is required for general file uploads');
        }
        return `${orgId}/`;
      default:
        throw new BadRequestException(`Invalid fileType: ${fileType}`);
    }
  }

  async getUploadTokens(
    request: GetUploadTokensRequest,
  ): Promise<GetUploadTokensResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const keyPrefix = this.getKeyPrefix(request.fileType, request.orgId);

    const tokenPromises = request.files.map(async (file) => {
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}${fileExtension ? `.${fileExtension}` : '.jpg'}`;
      const s3Key = `${keyPrefix}${filename}`;

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: s3Key,
        ContentType: file.mimetype,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return {
        token: presignedUrl,
        filename,
        urlPath: s3Key,
      };
    });

    const tokens = await Promise.all(tokenPromises);

    return { tokens };
  }
}
