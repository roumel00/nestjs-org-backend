import { Module } from '@nestjs/common';
import { GetImageUploadTokensModule } from './get-image-upload-tokens/getImageUploadTokens.module.js';

@Module({
  imports: [GetImageUploadTokensModule],
})
export class MediaModule {}
