import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInOrgController } from './userInOrg.controller.js';
import { UserInOrgService } from './userInOrg.service.js';
import { Organisation, OrganisationSchema } from '../schemas/organisation.schema.js';
import { UserInOrg, UserInOrgSchema } from '../schemas/userInOrg.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: UserInOrg.name, schema: UserInOrgSchema },
    ]),
  ],
  controllers: [UserInOrgController],
  providers: [UserInOrgService],
})
export class UserInOrgModule {}

