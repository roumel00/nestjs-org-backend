import { Module } from '@nestjs/common';
import { GetImageUploadTokenModule } from './get-image-upload-token/getImageUploadToken.module.js';

@Module({
  imports: [GetImageUploadTokenModule],
})
export class MediaModule {}
