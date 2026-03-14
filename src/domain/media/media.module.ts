import { Module } from '@nestjs/common';
import { GetUploadTokensModule } from './get-upload-tokens/getUploadTokens.module.js';
import { InitiateMultipartUploadModule } from './initiate-multipart-upload/initiateMultipartUpload.module.js';
import { CompleteMultipartUploadModule } from './complete-multipart-upload/completeMultipartUpload.module.js';
import { AbortMultipartUploadModule } from './abort-multipart-upload/abortMultipartUpload.module.js';

@Module({
  imports: [
    GetUploadTokensModule,
    InitiateMultipartUploadModule,
    CompleteMultipartUploadModule,
    AbortMultipartUploadModule,
  ],
})
export class MediaModule {}
