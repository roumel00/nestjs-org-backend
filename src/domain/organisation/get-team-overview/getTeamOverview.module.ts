import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetTeamOverviewController } from './getTeamOverview.controller.js';
import { GetTeamOverviewService } from './getTeamOverview.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetTeamOverviewController],
  providers: [GetTeamOverviewService],
})
export class GetTeamOverviewModule {}
