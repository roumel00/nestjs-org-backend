import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class RemoveUserService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async removeUser(workspaceId: string, userId: string, actor: { id: string; name: string | null }) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      workspaceId: workspaceId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new NotFoundException('User not found');
    }

    if (teamMember.role === 'owner' || teamMember.role === 'admin') {
      throw new BadRequestException('Owner or admin cannot be removed from the workspace');
    }

    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { deletedAt: new Date() } }).exec();

    this.eventEmitter.emit('notification.member_removed', {
      workspaceId,
      actorId: actor.id,
      actorName: actor.name,
      targetName: teamMember.name,
      targetEmail: teamMember.email,
    });

    return { message: 'User removed from workspace successfully' }
  }
}
