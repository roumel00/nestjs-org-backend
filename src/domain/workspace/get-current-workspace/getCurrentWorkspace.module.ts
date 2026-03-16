import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetCurrentWorkspaceController } from './getCurrentWorkspace.controller.js';
import { GetCurrentWorkspaceService } from './getCurrentWorkspace.service.js';
import { Workspace, WorkspaceSchema } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetCurrentWorkspaceController],
  providers: [GetCurrentWorkspaceService],
})
export class GetCurrentWorkspaceModule {}
