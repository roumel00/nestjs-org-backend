import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemoveUserController } from './removeUser.controller.js';
import { RemoveUserService } from './removeUser.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [RemoveUserController],
  providers: [RemoveUserService],
})
export class RemoveUserModule {}
