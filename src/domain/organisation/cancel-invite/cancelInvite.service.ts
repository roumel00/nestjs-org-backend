import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class CancelInviteService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async cancelInvite(inviteId: string) {
    const teamMember = await this.teamMemberModel.findByIdAndUpdate(
      inviteId,
      { deletedAt: new Date() },
      { new: true }
    ).exec();

    if (!teamMember) {
      throw new NotFoundException('Invite not found');
    }

    return { message: 'Invite cancelled successfully' };
  }
}
