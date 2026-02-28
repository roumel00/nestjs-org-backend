import { Module } from '@nestjs/common';
import { CreateOrgModule } from './create-org/createOrg.module.js';
import { GetOrgsModule } from './get-orgs/getOrgs.module.js';
import { GetCurrentOrgModule } from './get-current-org/getCurrentOrg.module.js';
import { SwitchOrgModule } from './switch-org/switchOrg.module.js';
import { InviteModule } from './invite/invite.module.js';
import { RemoveUserModule } from './remove-user/removeUser.module.js';
import { ChangeRoleModule } from './change-role/changeRole.module.js';
import { CancelInviteModule } from './cancel-invite/cancelInvite.module.js';
import { GetTeamMembersModule } from './get-team-members/getTeamMembers.module.js';

@Module({
  imports: [
    CreateOrgModule,
    GetOrgsModule,
    GetCurrentOrgModule,
    SwitchOrgModule,
    InviteModule,
    RemoveUserModule,
    ChangeRoleModule,
    CancelInviteModule,
    GetTeamMembersModule,
  ],
})
export class OrganisationModule {}
