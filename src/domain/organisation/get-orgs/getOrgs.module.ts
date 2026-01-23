import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetOrgsController } from './getOrgs.controller.js';
import { GetOrgsService } from './getOrgs.service.js';
import { Organisation, OrganisationSchema } from '@schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetOrgsController],
  providers: [GetOrgsService],
})
export class GetOrgsModule {}
