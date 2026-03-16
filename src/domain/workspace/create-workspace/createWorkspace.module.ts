import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateWorkspaceController } from './createWorkspace.controller.js';
import { CreateWorkspaceService } from './createWorkspace.service.js';
import { Workspace, WorkspaceSchema } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [CreateWorkspaceController],
  providers: [CreateWorkspaceService],
})
export class CreateWorkspaceModule {}
