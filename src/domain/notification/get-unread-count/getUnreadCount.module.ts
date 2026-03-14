import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';
import { GetUnreadCountController } from './getUnreadCount.controller.js';
import { GetUnreadCountService } from './getUnreadCount.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [GetUnreadCountController],
  providers: [GetUnreadCountService],
})
export class GetUnreadCountModule {}
