import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrgController } from './createOrg.controller.js';
import { CreateOrgService } from './createOrg.service.js';
import { Organisation, OrganisationSchema } from '@schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [CreateOrgController],
  providers: [CreateOrgService],
})
export class CreateOrgModule {}
