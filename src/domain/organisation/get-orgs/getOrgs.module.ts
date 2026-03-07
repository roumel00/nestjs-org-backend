import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetOrgsController } from './getOrgs.controller.js';
import { GetOrgsService } from './getOrgs.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetOrgsController],
  providers: [GetOrgsService],
})
export class GetOrgsModule {}
