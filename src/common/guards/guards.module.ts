import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceMemberGuard } from './workspaceMember.guard.js';
import { UserThrottlerGuard } from './userThrottler.guard.js';
import { PasswordThrottlerGuard } from './passwordThrottler.guard.js';
import { RoleGuard } from './role.guard.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  providers: [
    WorkspaceMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
    RoleGuard,
  ],
  exports: [
    WorkspaceMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
    RoleGuard,
  ],
})
export class GuardsModule {}
