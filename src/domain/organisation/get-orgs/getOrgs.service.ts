import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';

@Injectable()
export class GetOrgsService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    const results = await this.teamMemberModel.aggregate([
      // Find all orgs the user belongs to
      { $match: { userId, deletedAt: null } },
      // Look up the organisation details
      {
        $lookup: {
          from: 'organisation',
          let: { orgId: { $toObjectId: '$orgId' } },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$orgId'] } } }],
          as: 'org',
        },
      },
      { $unwind: '$org' },
      // Count all active members per org
      {
        $lookup: {
          from: 'teamMember',
          let: { orgId: '$orgId' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$orgId', '$$orgId'] }, { $eq: ['$deletedAt', null] }] } } },
            { $count: 'count' },
          ],
          as: 'memberCount',
        },
      },
      // Project the final shape
      {
        $project: {
          _id: 0,
          orgId: '$org._id',
          name: '$org.name',
          timezone: '$org.timezone',
          owner: '$org.owner',
          logo: '$org.logo',
          role: '$role',
          memberCount: { $ifNull: [{ $arrayElemAt: ['$memberCount.count', 0] }, 0] },
        },
      },
    ]);

    return results;
  }
}
