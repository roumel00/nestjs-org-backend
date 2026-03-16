import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateWorkspaceDetailsController } from './updateWorkspaceDetails.controller.js';
import { UpdateWorkspaceDetailsService } from './updateWorkspaceDetails.service.js';
import { Workspace, WorkspaceSchema } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [UpdateWorkspaceDetailsController],
  providers: [UpdateWorkspaceDetailsService],
})
export class UpdateWorkspaceDetailsModule {}
