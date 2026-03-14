import { Controller, Post, Body } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetUploadTokensService } from './getUploadTokens.service.js';
import { GetUploadTokensRequest } from './getUploadTokens.validator.js';
import type { GetUploadTokensResponse } from './getUploadTokens.types.js';

@Controller('media')
export class GetUploadTokensController {
  constructor(private readonly getUploadTokensService: GetUploadTokensService) {}

  @Post('upload-tokens')
  async getUploadTokens(
    @Session() _session: UserSession,
    @Body() body: GetUploadTokensRequest,
  ): Promise<GetUploadTokensResponse> {
    return this.getUploadTokensService.getUploadTokens(body);
  }
}
