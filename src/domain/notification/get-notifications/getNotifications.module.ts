import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';
import { GetNotificationsController } from './getNotifications.controller.js';
import { GetNotificationsService } from './getNotifications.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetNotificationsController],
  providers: [GetNotificationsService],
})
export class GetNotificationsModule {}
