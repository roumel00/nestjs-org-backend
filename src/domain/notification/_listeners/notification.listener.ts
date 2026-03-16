import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '@schemas/notification.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import type { NotificationContext } from '../_types/notificationContext.types.js';
import type {
  InviteSentEvent,
  InviteCancelledEvent,
  RoleChangedEvent,
  MemberRemovedEvent,
} from '../_types/notificationEvents.types.js';

@Injectable()
export class NotificationListener {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  @OnEvent('notification.invite_sent')
  async handleInviteSent(event: InviteSentEvent) {
    const recipients = await this.getAdminAndOwnerRecipients(event.workspaceId, event.actorId);

    const context: NotificationContext = {
      type: 'invite_sent',
      title: `${event.actorName ?? 'A team member'} invited ${event.inviteeEmail}`,
      actorId: event.actorId,
      actorName: event.actorName,
      inviteeEmail: event.inviteeEmail,
    };

    await this.createNotifications(event.workspaceId, recipients, context);
  }

  @OnEvent('notification.invite_cancelled')
  async handleInviteCancelled(event: InviteCancelledEvent) {
    const recipients = await this.getAdminAndOwnerRecipients(event.workspaceId, event.actorId);

    const context: NotificationContext = {
      type: 'invite_cancelled',
      title: `${event.actorName ?? 'A team member'} cancelled the invite for ${event.inviteeEmail}`,
      actorId: event.actorId,
      actorName: event.actorName,
      inviteeEmail: event.inviteeEmail,
    };

    await this.createNotifications(event.workspaceId, recipients, context);
  }

  @OnEvent('notification.role_changed')
  async handleRoleChanged(event: RoleChangedEvent) {
    const context: NotificationContext = {
      type: 'role_changed',
      title: `${event.actorName ?? 'A team member'} changed your role from ${event.previousRole} to ${event.newRole}`,
      actorId: event.actorId,
      actorName: event.actorName,
      newRole: event.newRole,
      previousRole: event.previousRole,
    };

    await this.createNotifications(event.workspaceId, [event.targetId], context);
  }

  @OnEvent('notification.member_removed')
  async handleMemberRemoved(event: MemberRemovedEvent) {
    const recipients = await this.getAdminAndOwnerRecipients(event.workspaceId, event.actorId);

    const context: NotificationContext = {
      type: 'member_removed',
      title: `${event.actorName ?? 'A team member'} removed ${event.targetName ?? event.targetEmail} from the workspace`,
      actorId: event.actorId,
      actorName: event.actorName,
      targetName: event.targetName,
      targetEmail: event.targetEmail,
    };

    await this.createNotifications(event.workspaceId, recipients, context);
  }

  private async getAdminAndOwnerRecipients(workspaceId: string, excludeUserId: string): Promise<string[]> {
    const teamMembers = await this.teamMemberModel.find({
      workspaceId,
      role: { $in: ['admin', 'owner'] },
      deletedAt: null,
      userId: { $ne: null, $nin: [excludeUserId] },
    }).exec();

    return teamMembers
      .map((tm) => tm.userId)
      .filter((id): id is string => id !== null);
  }

  private async createNotifications(
    workspaceId: string,
    recipientIds: string[],
    context: NotificationContext,
  ) {
    if (recipientIds.length === 0) return;

    const notifications = recipientIds.map((recipientId) => ({
      workspaceId,
      recipientId,
      context,
      read: false,
    }));

    await this.notificationModel.insertMany(notifications);
  }
}
