import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';
import { MarkAllReadController } from './markAllRead.controller.js';
import { MarkAllReadService } from './markAllRead.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [MarkAllReadController],
  providers: [MarkAllReadService],
})
export class MarkAllReadModule {}
