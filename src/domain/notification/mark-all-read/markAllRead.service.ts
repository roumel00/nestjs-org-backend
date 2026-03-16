import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification.schema.js';
import type { MarkAllReadResponse } from './markAllRead.types.js';

@Injectable()
export class MarkAllReadService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async markAllRead(userId: string, workspaceId: string): Promise<MarkAllReadResponse> {
    await this.notificationModel.updateMany(
      { recipientId: userId, workspaceId, read: false },
      { $set: { read: true } },
    ).exec();

    return { message: 'All notifications marked as read' };
  }
}
