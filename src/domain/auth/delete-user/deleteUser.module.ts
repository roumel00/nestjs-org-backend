import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteUserController } from './deleteUser.controller.js';
import { DeleteUserService } from './deleteUser.service.js';
import { Organisation, OrganisationSchema } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [DeleteUserController],
  providers: [DeleteUserService],
})
export class DeleteUserModule {}
