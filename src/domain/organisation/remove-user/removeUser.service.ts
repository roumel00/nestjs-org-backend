import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class RemoveUserService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async removeUser(orgId: string, userId: string) {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new NotFoundException('User not found');
    }

    if (teamMember.role === 'owner' || teamMember.role === 'admin') {
      throw new BadRequestException('Owner or admin cannot be removed from the organisation');
    }

    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { deletedAt: new Date() } }).exec();

    return { message: 'User removed from organisation successfully' }
  }
}
