import { Controller, Post, Body } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { GetLogoUploadTokenService } from './getLogoUploadToken.service.js';
import { GetLogoUploadTokenRequest, GetLogoUploadTokenResponse } from './getLogoUploadToken.dto.js';

@Controller('media')
export class GetLogoUploadTokenController {
  constructor(private readonly getLogoUploadTokenService: GetLogoUploadTokenService) {}

  @Post('logo-upload-token')
  async getLogoUploadToken(
    @Session() _session: UserSession,
    @Body() body: GetLogoUploadTokenRequest,
  ): Promise<GetLogoUploadTokenResponse> {
    return this.getLogoUploadTokenService.getLogoUploadToken(body);
  }
}
