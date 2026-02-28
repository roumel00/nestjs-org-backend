import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamMember,
  TeamMemberDocument,
} from '@schemas/teamMember.schema.js';

@Injectable()
export class GetTeamMembersService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getTeamMembers(orgId: string) {
    return this.teamMemberModel
      .aggregate([
        { $match: { orgId, deletedAt: null } },
        {
          $lookup: {
            from: 'user',
            localField: 'email',
            foreignField: 'email',
            as: 'user',
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            name: {
              $cond: {
                if: { $and: ['$user.firstName', '$user.lastName'] },
                then: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                else: null,
              },
            },
            image: { $ifNull: ['$user.image', null] },
          },
        },
        { $project: { user: 0 } },
        { $sort: { createdAt: 1 } },
      ])
      .exec();
  }
}
