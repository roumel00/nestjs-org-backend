import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMemberController } from './teamMember.controller.js';
import { TeamMemberService } from './teamMember.service.js';
import { Organisation, OrganisationSchema } from '../schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}

