import type { NotificationContext } from '../_types/notificationContext.types.js';
import type { NotificationDocument } from '@schemas/notification.schema.js';

export type GetNotificationsRequest = {
  page?: number;
  limit?: number;
};

export type NotificationDto = {
  _id: string;
  workspaceId: string;
  recipientId: string;
  context: NotificationContext;
  read: boolean;
  createdAt: Date;
};

export type GetNotificationsResponse = {
  notifications: NotificationDocument[];
  total: number;
  page: number;
  totalPages: number;
};
