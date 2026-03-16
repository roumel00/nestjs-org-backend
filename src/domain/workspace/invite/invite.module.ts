import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller.js';
import { InviteService } from './invite.service.js';
import { Workspace, WorkspaceSchema } from '@schemas/workspace.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
