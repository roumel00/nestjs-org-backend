import { Module } from '@nestjs/common';
import { ListenerModule } from './_listeners/listener.module.js';
import { GetNotificationsModule } from './get-notifications/getNotifications.module.js';
import { GetUnreadCountModule } from './get-unread-count/getUnreadCount.module.js';
import { MarkReadModule } from './mark-read/markRead.module.js';
import { MarkAllReadModule } from './mark-all-read/markAllRead.module.js';

@Module({
  imports: [
    ListenerModule,
    GetNotificationsModule,
    GetUnreadCountModule,
    MarkReadModule,
    MarkAllReadModule,
  ],
})
export class NotificationModule {}
