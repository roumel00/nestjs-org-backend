import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller.js';
import { InviteService } from './invite.service.js';
import { Organisation, OrganisationSchema } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
