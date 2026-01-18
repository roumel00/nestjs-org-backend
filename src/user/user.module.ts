import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { PasswordModule } from './password/password.module.js';
import { VerifyModule } from './verify/verify.module.js';
import { Organisation, OrganisationSchema } from '../organisation/schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '../organisation/schemas/teamMember.schema.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
    PasswordModule, 
    VerifyModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
