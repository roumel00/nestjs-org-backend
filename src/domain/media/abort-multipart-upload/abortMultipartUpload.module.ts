import { Module } from '@nestjs/common';
import { AbortMultipartUploadController } from './abortMultipartUpload.controller.js';
import { AbortMultipartUploadService } from './abortMultipartUpload.service.js';

@Module({
  controllers: [AbortMultipartUploadController],
  providers: [AbortMultipartUploadService],
})
export class AbortMultipartUploadModule {}
