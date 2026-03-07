import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetOrgDetailsController } from './getOrgDetails.controller.js';
import { GetOrgDetailsService } from './getOrgDetails.service.js';
import { Organisation, OrganisationSchema } from '@schemas/organisation.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
    ]),
  ],
  controllers: [GetOrgDetailsController],
  providers: [GetOrgDetailsService],
})
export class GetOrgDetailsModule {}
