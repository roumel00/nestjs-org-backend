import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetCurrentOrgController } from './getCurrentOrg.controller.js';
import { GetCurrentOrgService } from './getCurrentOrg.service.js';
import { Organisation, OrganisationSchema } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetCurrentOrgController],
  providers: [GetCurrentOrgService],
})
export class GetCurrentOrgModule {}
