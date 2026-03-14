import { Module } from '@nestjs/common';
import { InitiateMultipartUploadController } from './initiateMultipartUpload.controller.js';
import { InitiateMultipartUploadService } from './initiateMultipartUpload.service.js';

@Module({
  controllers: [InitiateMultipartUploadController],
  providers: [InitiateMultipartUploadService],
})
export class InitiateMultipartUploadModule {}
