import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetWorkspacesController } from './getWorkspaces.controller.js';
import { GetWorkspacesService } from './getWorkspaces.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetWorkspacesController],
  providers: [GetWorkspacesService],
})
export class GetWorkspacesModule {}
