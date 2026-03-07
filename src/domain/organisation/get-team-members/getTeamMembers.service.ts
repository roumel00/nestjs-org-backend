import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamMember,
  TeamMemberDocument,
} from '@schemas/teamMember.schema.js';
import { getTeamMembersQuery, getTeamMembersCountQuery } from './getTeamMembers.query.js';

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
    const allowedSortFields = ['name', 'email', 'role', 'createdAt'];
    const sortField = sortBy && allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    const [countResult] = await this.teamMemberModel
      .aggregate(getTeamMembersCountQuery(orgId, search))
      .exec();
    const total = countResult?.total ?? 0;

    const members = await this.teamMemberModel
      .aggregate(getTeamMembersQuery(orgId, page, PAGE_SIZE, sortField, sortDirection, search))
      .exec();

    return {
      members,
      total,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  }
}
