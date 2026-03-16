import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetTeamMembersController } from './getTeamMembers.controller.js';
import { GetTeamMembersService } from './getTeamMembers.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetTeamMembersController],
  providers: [GetTeamMembersService],
})
export class GetTeamMembersModule {}
