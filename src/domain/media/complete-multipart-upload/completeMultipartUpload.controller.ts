import { Controller, Post, Body } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CompleteMultipartUploadService } from './completeMultipartUpload.service.js';
import { CompleteMultipartUploadRequest } from './completeMultipartUpload.validator.js';
import type { CompleteMultipartUploadResponse } from './completeMultipartUpload.types.js';

@Controller('media')
export class CompleteMultipartUploadController {
  constructor(
    private readonly completeMultipartUploadService: CompleteMultipartUploadService,
  ) {}

  @Post('multipart/complete')
  async completeMultipartUpload(
    @Session() _session: UserSession,
    @Body() body: CompleteMultipartUploadRequest,
  ): Promise<CompleteMultipartUploadResponse> {
    return this.completeMultipartUploadService.completeMultipartUpload(body);
  }
}
