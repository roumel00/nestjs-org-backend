import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class ChangeRoleService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async changeRole(orgId: string, userId: string, role: string) {
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

    await this.teamMemberModel.updateOne({
      _id: teamMember._id,
    }, { $set: { role: role as 'owner' | 'admin' | 'member' } }).exec();

    return { message: 'Role changed successfully' }
  }
}
