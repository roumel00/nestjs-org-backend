import { Module } from '@nestjs/common';
import { GetUploadTokensModule } from './get-upload-tokens/getUploadTokens.module.js';

@Module({
  imports: [
    GetUploadTokensModule,
  ],
})
export class MediaModule {}
