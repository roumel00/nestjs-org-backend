import { Module } from '@nestjs/common';
import { GetLogoUploadTokenController } from './getLogoUploadToken.controller.js';
import { GetLogoUploadTokenService } from './getLogoUploadToken.service.js';

@Module({
  controllers: [GetLogoUploadTokenController],
  providers: [GetLogoUploadTokenService],
})
export class GetLogoUploadTokenModule {}
