import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification.schema.js';
import type { MarkReadResponse } from './markRead.types.js';

@Injectable()
export class MarkReadService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async markRead(notificationId: string, userId: string): Promise<MarkReadResponse> {
    const result = await this.notificationModel.updateOne(
      { _id: notificationId, recipientId: userId },
      { $set: { read: true } },
    ).exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException('Notification not found');
    }

    return { message: 'Notification marked as read' };
  }
}
