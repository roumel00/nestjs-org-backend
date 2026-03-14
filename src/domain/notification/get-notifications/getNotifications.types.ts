import type { NotificationContext } from '../_types/notificationContext.types.js';

export type GetNotificationsRequest = {
  page?: number;
  limit?: number;
};

export type NotificationDto = {
  _id: string;
  orgId: string;
  recipientId: string;
  context: NotificationContext;
  read: boolean;
  createdAt: Date;
};

export type GetNotificationsResponse = {
  notifications: NotificationDto[];
  total: number;
  page: number;
  totalPages: number;
};
