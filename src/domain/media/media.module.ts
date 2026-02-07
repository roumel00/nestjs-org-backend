import { Module } from '@nestjs/common';
import { GetImageUploadTokensModule } from './get-image-upload-tokens/getImageUploadTokens.module.js';
import { GetLogoUploadTokenModule } from './get-logo-upload-token/getLogoUploadToken.module.js';

@Module({
  imports: [
    GetImageUploadTokensModule,
    GetLogoUploadTokenModule,
  ],
})
export class MediaModule {}
