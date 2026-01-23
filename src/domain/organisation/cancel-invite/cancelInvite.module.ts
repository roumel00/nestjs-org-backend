import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CancelInviteController } from './cancelInvite.controller.js';
import { CancelInviteService } from './cancelInvite.service.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [CancelInviteController],
  providers: [CancelInviteService],
})
export class CancelInviteModule {}
