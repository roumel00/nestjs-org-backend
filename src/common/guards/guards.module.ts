import { Module, Global } from '@nestjs/common';
import { OrgMemberGuard } from './orgMember.guard.js';
import { UserThrottlerGuard } from './userThrottler.guard.js';
import { PasswordThrottlerGuard } from './passwordThrottler.guard.js';
import { RoleGuard } from './role.guard.js';

@Global()
@Module({
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
