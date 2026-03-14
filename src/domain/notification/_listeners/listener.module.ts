import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberSchema } from '@schemas/teamMember.schema.js';
import { NotificationListener } from './notification.listener.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  providers: [NotificationListener],
})
export class ListenerModule {}
