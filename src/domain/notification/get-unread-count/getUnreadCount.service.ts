import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification.schema.js';
import type { GetUnreadCountResponse } from './getUnreadCount.types.js';

@Injectable()
export class GetUnreadCountService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async getUnreadCount(userId: string, orgId: string): Promise<GetUnreadCountResponse> {
    const count = await this.notificationModel.countDocuments({
      recipientId: userId,
      orgId,
      read: false,
    }).exec();

    return { count };
  }
}
