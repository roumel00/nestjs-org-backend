import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgMemberGuard } from './orgMember.guard.js';
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
    OrgMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
    RoleGuard,
  ],
  exports: [
    OrgMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
    RoleGuard,
  ],
})
export class GuardsModule {}
