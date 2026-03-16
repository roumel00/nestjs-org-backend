import { Module } from '@nestjs/common';
import { CreateWorkspaceModule } from './create-workspace/createWorkspace.module.js';
import { GetWorkspacesModule } from './get-workspaces/getWorkspaces.module.js';
import { GetCurrentWorkspaceModule } from './get-current-workspace/getCurrentWorkspace.module.js';
import { SwitchWorkspaceModule } from './switch-workspace/switchWorkspace.module.js';
import { ClearWorkspaceModule } from './clear-workspace/clearWorkspace.module.js';
import { InviteModule } from './invite/invite.module.js';
import { RemoveUserModule } from './remove-user/removeUser.module.js';
import { ChangeRoleModule } from './change-role/changeRole.module.js';
import { CancelInviteModule } from './cancel-invite/cancelInvite.module.js';
import { GetTeamMembersModule } from './get-team-members/getTeamMembers.module.js';
import { GetTeamOverviewModule } from './get-team-overview/getTeamOverview.module.js';
import { GetWorkspaceDetailsModule } from './get-workspace-details/getWorkspaceDetails.module.js';
import { UpdateWorkspaceDetailsModule } from './update-workspace-details/updateWorkspaceDetails.module.js';

@Module({
  imports: [
    CreateWorkspaceModule,
    GetWorkspacesModule,
    GetCurrentWorkspaceModule,
    SwitchWorkspaceModule,
    ClearWorkspaceModule,
    InviteModule,
    RemoveUserModule,
    ChangeRoleModule,
    CancelInviteModule,
    GetTeamMembersModule,
    GetTeamOverviewModule,
    GetWorkspaceDetailsModule,
    UpdateWorkspaceDetailsModule,
  ],
})
export class WorkspaceModule {}
