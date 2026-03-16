import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwitchWorkspaceController } from './switchWorkspace.controller.js';
import { SwitchWorkspaceService } from './switchWorkspace.service.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [SwitchWorkspaceController],
  providers: [SwitchWorkspaceService],
})
export class SwitchWorkspaceModule {}
