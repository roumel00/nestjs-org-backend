import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateOrgDetailsController } from './updateOrgDetails.controller.js';
import { UpdateOrgDetailsService } from './updateOrgDetails.service.js';
import { Organisation, OrganisationSchema } from '@schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [UpdateOrgDetailsController],
  providers: [UpdateOrgDetailsService],
})
export class UpdateOrgDetailsModule {}
