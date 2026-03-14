import { Controller, Post, Body } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { AbortMultipartUploadService } from './abortMultipartUpload.service.js';
import { AbortMultipartUploadRequest } from './abortMultipartUpload.validator.js';
import type { AbortMultipartUploadResponse } from './abortMultipartUpload.types.js';

@Controller('media')
export class AbortMultipartUploadController {
  constructor(
    private readonly abortMultipartUploadService: AbortMultipartUploadService,
  ) {}

  @Post('multipart/abort')
  async abortMultipartUpload(
    @Session() _session: UserSession,
    @Body() body: AbortMultipartUploadRequest,
  ): Promise<AbortMultipartUploadResponse> {
    return this.abortMultipartUploadService.abortMultipartUpload(body);
  }
}
