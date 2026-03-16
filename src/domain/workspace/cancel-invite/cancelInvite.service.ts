import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class CancelInviteService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async cancelInvite(workspaceId: string, email: string, actor: { id: string; name: string | null }) {
    const teamMember = await this.teamMemberModel.findOneAndUpdate(
      { email, workspaceId, role: 'invitee', deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    ).exec();

    if (!teamMember) {
      throw new NotFoundException('Invite not found');
    }

    this.eventEmitter.emit('notification.invite_cancelled', {
      workspaceId,
      actorId: actor.id,
      actorName: actor.name,
      inviteeEmail: email,
    });

    return { message: 'Invite cancelled successfully' };
  }
}
