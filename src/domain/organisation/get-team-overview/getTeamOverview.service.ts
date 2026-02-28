import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamMember,
  TeamMemberDocument,
} from '@schemas/teamMember.schema.js';

const userLookupStages = [
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
];

@Injectable()
export class GetTeamOverviewService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getTeamOverview(orgId: string) {
    const baseMatch = { orgId, deletedAt: null };

    const [owner] = await this.teamMemberModel
      .aggregate([
        { $match: { ...baseMatch, role: 'owner' } },
        ...userLookupStages,
      ])
      .exec();

    const countResults = await this.teamMemberModel
      .aggregate([
        { $match: { ...baseMatch, role: { $ne: 'owner' } } },
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ])
      .exec();

    const counts = { admins: 0, members: 0, invitees: 0 };
    for (const { _id, count } of countResults) {
      if (_id === 'admin') counts.admins = count;
      else if (_id === 'member') counts.members = count;
      else if (_id === 'invitee') counts.invitees = count;
    }

    const [recentAdmins, recentMembers] = await Promise.all([
      this.teamMemberModel
        .aggregate([
          { $match: { ...baseMatch, role: 'admin' } },
          ...userLookupStages,
          { $sort: { createdAt: 1 } },
          { $limit: 2 },
        ])
        .exec(),
      this.teamMemberModel
        .aggregate([
          { $match: { ...baseMatch, role: 'member' } },
          ...userLookupStages,
          { $sort: { createdAt: 1 } },
          { $limit: 2 },
        ])
        .exec(),
    ]);

    return { owner, counts, recentAdmins, recentMembers };
  }
}
