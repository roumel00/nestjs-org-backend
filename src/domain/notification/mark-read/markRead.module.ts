import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';
import { MarkReadController } from './markRead.controller.js';
import { MarkReadService } from './markRead.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [MarkReadController],
  providers: [MarkReadService],
})
export class MarkReadModule {}
