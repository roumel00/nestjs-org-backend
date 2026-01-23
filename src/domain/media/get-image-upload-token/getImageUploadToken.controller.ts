import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GetImageUploadTokenService } from './getImageUploadToken.service.js';
import { GetImageUploadTokenRequest, GetImageUploadTokenResponse } from './getImageUploadToken.dto.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('media')
export class GetImageUploadTokenController {
  constructor(private readonly getImageUploadTokenService: GetImageUploadTokenService) {}

  @Post('image-upload-token')
  @UseGuards(OrgMemberGuard)
  async getImageUploadToken(
    @CurrentOrg() orgId: string,
    @Body() body: GetImageUploadTokenRequest,
  ): Promise<GetImageUploadTokenResponse> {
    return this.getImageUploadTokenService.getImageUploadToken(orgId, body);
  }
}
