import { PipelineStage } from 'mongoose';

export function getTeamMembersQuery(
  orgId: string,
  page: number,
  pageSize: number,
  sortField: string,
  sortDirection: 1 | -1,
  search?: string,
): PipelineStage[] {
  const pipeline: PipelineStage[] = [
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

  const skip = (page - 1) * pageSize;
  pipeline.push(
    { $sort: { [sortField]: sortDirection } },
    { $skip: skip },
    { $limit: pageSize },
  );

  return pipeline;
}

export function getTeamMembersCountQuery(
  orgId: string,
  search?: string,
): PipelineStage[] {
  const pipeline: PipelineStage[] = [
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

  pipeline.push({ $count: 'total' });

  return pipeline;
}
