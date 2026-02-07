import { Injectable, BadRequestException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET_NAME } from '@config/s3.js';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import { GetLogoUploadTokenRequest, GetLogoUploadTokenResponse } from './getLogoUploadToken.dto.js';

@Injectable()
export class GetLogoUploadTokenService {
  async getLogoUploadToken(
    request: GetLogoUploadTokenRequest,
  ): Promise<GetLogoUploadTokenResponse> {
    if (!S3_BUCKET_NAME) {
      throw new BadRequestException('S3 bucket not configured');
    }

    const fileExtension = extension(request.mimetype);
    const filename = `${randomUUID()}${fileExtension ? `.${fileExtension}` : '.jpg'}`;
    const s3Key = `logos/${filename}`;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
      ContentType: request.mimetype,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return {
      token: presignedUrl,
      filename,
      urlPath: s3Key,
    };
  }
}
