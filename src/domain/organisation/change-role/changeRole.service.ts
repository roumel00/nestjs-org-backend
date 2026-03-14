import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class ChangeRoleService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async changeRole(orgId: string, userId: string, role: string, actor: { id: string; name: string | null }) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new NotFoundException('User not found');
    }

    if (teamMember.role === 'owner') {
      throw new BadRequestException('Owner cannot be changed to a different role');
    }

    const previousRole = teamMember.role;

    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { role: role as 'owner' | 'admin' | 'member' | 'invitee' } }).exec();

    this.eventEmitter.emit('notification.role_changed', {
      orgId,
      actorId: actor.id,
      actorName: actor.name,
      targetId: userId,
      targetName: teamMember.name,
      newRole: role,
      previousRole,
    });

    return { message: 'Role changed successfully' }
  }
}
