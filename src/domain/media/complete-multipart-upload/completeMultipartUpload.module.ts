import { Module } from '@nestjs/common';
import { CompleteMultipartUploadController } from './completeMultipartUpload.controller.js';
import { CompleteMultipartUploadService } from './completeMultipartUpload.service.js';

@Module({
  controllers: [CompleteMultipartUploadController],
  providers: [CompleteMultipartUploadService],
})
export class CompleteMultipartUploadModule {}
