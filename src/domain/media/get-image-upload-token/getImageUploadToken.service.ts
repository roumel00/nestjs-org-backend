import { Injectable, BadRequestException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import { GetImageUploadTokenRequest, GetImageUploadTokenResponse } from './getImageUploadToken.dto.js';

@Injectable()
export class GetImageUploadTokenService {
  private getUrlPath(fileType: string): string {
    switch (fileType) {
      case 'avatar':
        return 'avatars/';
      case 'logo':
        return 'logos/';
      default:
        throw new BadRequestException(`Invalid fileType: ${fileType}`);
    }
  }

  async getImageUploadToken(
    orgId: string,
    request: GetImageUploadTokenRequest,
  ): Promise<GetImageUploadTokenResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const urlPath = this.getUrlPath(request.fileType);
    const fileExtension = extension(request.mimetype);
    const filename = `${randomUUID()}${fileExtension ? `.${fileExtension}` : '.jpg'}`;
    const s3Key = `${orgId}/${urlPath}${filename}`;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
      ContentType: request.mimetype,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    return {
      token: presignedUrl,
      filename,
      urlPath: s3Key,
    };
  }
}
