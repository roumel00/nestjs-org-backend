import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwitchOrgController } from './switchOrg.controller.js';
import { SwitchOrgService } from './switchOrg.service.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [SwitchOrgController],
  providers: [SwitchOrgService],
})
export class SwitchOrgModule {}
