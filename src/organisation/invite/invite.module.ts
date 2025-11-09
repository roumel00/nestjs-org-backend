import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteController } from './invite.controller.js';
import { InviteService } from './invite.service.js';
import { InviteInOrg, InviteInOrgSchema } from '../schemas/inviteInOrg.schema.js';
import { UserInOrg, UserInOrgSchema } from '../schemas/userInOrg.schema.js';
import { Organisation, OrganisationSchema } from '../schemas/organisation.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InviteInOrg.name, schema: InviteInOrgSchema },
      { name: UserInOrg.name, schema: UserInOrgSchema },
      { name: Organisation.name, schema: OrganisationSchema },
    ]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
