import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgMemberGuard } from './orgMember.guard.js';
import { UserThrottlerGuard } from './userThrottler.guard.js';
import { PasswordThrottlerGuard } from './passwordThrottler.guard.js';
import { RoleGuard } from './role.guard.js';
import { UserInOrg, UserInOrgSchema } from '../../organisation/schemas/userInOrg.schema.js';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInOrg.name, schema: UserInOrgSchema },
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
