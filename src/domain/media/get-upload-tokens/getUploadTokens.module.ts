import { Module } from '@nestjs/common';
import { GetUploadTokensController } from './getUploadTokens.controller.js';
import { GetUploadTokensService } from './getUploadTokens.service.js';

@Module({
  controllers: [GetUploadTokensController],
  providers: [GetUploadTokensService],
})
export class GetUploadTokensModule {}
