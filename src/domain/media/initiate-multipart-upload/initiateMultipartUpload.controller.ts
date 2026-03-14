import { Controller, Post, Body } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { InitiateMultipartUploadService } from './initiateMultipartUpload.service.js';
import { InitiateMultipartUploadRequest } from './initiateMultipartUpload.validator.js';
import type { InitiateMultipartUploadResponse } from './initiateMultipartUpload.types.js';

@Controller('media')
export class InitiateMultipartUploadController {
  constructor(
    private readonly initiateMultipartUploadService: InitiateMultipartUploadService,
  ) {}

  @Post('multipart/initiate')
  async initiateMultipartUpload(
    @Session() _session: UserSession,
    @Body() body: InitiateMultipartUploadRequest,
  ): Promise<InitiateMultipartUploadResponse> {
    return this.initiateMultipartUploadService.initiateMultipartUpload(body);
  }
}
