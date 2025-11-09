import { Module, Global } from '@nestjs/common';
import { OrgMemberGuard } from './orgMember.guard.js';
import { UserThrottlerGuard } from './userThrottler.guard.js';
import { PasswordThrottlerGuard } from './passwordThrottler.guard.js';

@Global()
@Module({
  providers: [
    OrgMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
  ],
  exports: [
    OrgMemberGuard,
    UserThrottlerGuard,
    PasswordThrottlerGuard,
  ],
})
export class GuardsModule {}
