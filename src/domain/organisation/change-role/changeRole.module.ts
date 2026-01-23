import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeRoleController } from './changeRole.controller.js';
import { ChangeRoleService } from './changeRole.service.js';
import { TeamMember, TeamMemberSchema } from '../../../schemas/teamMember.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [ChangeRoleController],
  providers: [ChangeRoleService],
})
export class ChangeRoleModule {}
