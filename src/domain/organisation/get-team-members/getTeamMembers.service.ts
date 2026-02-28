import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamMember,
  TeamMemberDocument,
} from '@schemas/teamMember.schema.js';

const PAGE_SIZE = 10;

@Injectable()
export class GetTeamMembersService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getTeamMembers(
    orgId: string,
    page: number,
    search?: string,
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const pipeline: any[] = [
      { $match: { orgId, deletedAt: null } },
    ];

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = { $regex: escaped, $options: 'i' };
      pipeline.push({
        $match: {
          $or: [{ name: searchRegex }, { email: searchRegex }],
        },
      });
    }

    const countPipeline = [...pipeline, { $count: 'total' }];
    const [countResult] = await this.teamMemberModel
      .aggregate(countPipeline)
      .exec();
    const total = countResult?.total ?? 0;

    const allowedSortFields = ['name', 'email', 'role', 'createdAt'];
    const sortField = sortBy && allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * PAGE_SIZE;
    pipeline.push(
      { $sort: { [sortField]: sortDirection } },
      { $skip: skip },
      { $limit: PAGE_SIZE },
    );

    const members = await this.teamMemberModel.aggregate(pipeline).exec();

    return {
      members,
      total,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  }
}
