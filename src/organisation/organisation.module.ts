import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganisationController } from './organisation.controller.js';
import { OrganisationService } from './organisation.service.js';
import { Organisation, OrganisationSchema } from './schemas/organisation.schema.js';
import { UserInOrg, UserInOrgSchema } from './schemas/userInOrg.schema.js';
import { InviteModule } from './invite/invite.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: UserInOrg.name, schema: UserInOrgSchema },
    ]),
    InviteModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
