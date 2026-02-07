import { Injectable, BadRequestException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import { GetImageUploadTokensRequest, GetImageUploadTokensResponse, ImageUploadToken } from './getImageUploadTokens.dto.js';

@Injectable()
export class GetImageUploadTokensService {
  private getUrlPath(fileType: string): string {
    switch (fileType) {
      case 'avatar':
        return 'avatars/';
      default:
        throw new BadRequestException(`Invalid fileType: ${fileType}`);
    }
  }

  async getImageUploadTokens(
    orgId: string,
    request: GetImageUploadTokensRequest,
  ): Promise<GetImageUploadTokensResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const urlPath = this.getUrlPath(request.fileType);

    // Generate all presigned URLs in parallel
    const tokenPromises = request.files.map(async (file) => {
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}${fileExtension ? `.${fileExtension}` : '.jpg'}`;
      const s3Key = `${orgId}/${urlPath}${filename}`;

      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: s3Key,
        ContentType: file.mimetype,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, // 1 hour
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
