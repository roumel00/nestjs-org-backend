import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganisationController } from './organisation.controller.js';
import { OrganisationService } from './organisation.service.js';
import { Organisation, OrganisationSchema } from './schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from './schemas/teamMember.schema.js';
import { TeamMemberModule } from './teamMember/teamMember.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
    TeamMemberModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
