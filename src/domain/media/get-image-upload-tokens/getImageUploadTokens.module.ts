import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetImageUploadTokensController } from './getImageUploadTokens.controller.js';
import { GetImageUploadTokensService } from './getImageUploadTokens.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetImageUploadTokensController],
  providers: [GetImageUploadTokensService],
})
export class GetImageUploadTokensModule {}
