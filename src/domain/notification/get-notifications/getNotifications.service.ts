import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification.schema.js';
import type { GetNotificationsResponse } from './getNotifications.types.js';

@Injectable()
export class GetNotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async getNotifications(
    userId: string,
    workspaceId: string,
    page = 1,
    limit = 20,
  ): Promise<GetNotificationsResponse> {
    const filter = { recipientId: userId, workspaceId };
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.notificationModel.countDocuments(filter).exec(),
    ]);

    return {
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
