import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetImageUploadTokenController } from './getImageUploadToken.controller.js';
import { GetImageUploadTokenService } from './getImageUploadToken.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetImageUploadTokenController],
  providers: [GetImageUploadTokenService],
})
export class GetImageUploadTokenModule {}
