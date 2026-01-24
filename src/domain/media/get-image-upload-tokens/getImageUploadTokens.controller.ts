import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GetImageUploadTokensService } from './getImageUploadTokens.service.js';
import { GetImageUploadTokensRequest, GetImageUploadTokensResponse } from './getImageUploadTokens.dto.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('media')
export class GetImageUploadTokensController {
  constructor(private readonly getImageUploadTokensService: GetImageUploadTokensService) {}

  @Post('image-upload-tokens')
  @UseGuards(OrgMemberGuard)
  async getImageUploadTokens(
    @CurrentOrg() orgId: string,
    @Body() body: GetImageUploadTokensRequest,
  ): Promise<GetImageUploadTokensResponse> {
    return this.getImageUploadTokensService.getImageUploadTokens(orgId, body);
  }
}
