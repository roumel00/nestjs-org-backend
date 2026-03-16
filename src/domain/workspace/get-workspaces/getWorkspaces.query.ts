import { PipelineStage } from 'mongoose';

export function getUserWorkspacesQuery(userId: string): PipelineStage[] {
  return [
    { $match: { userId, deletedAt: null } },
    {
      $lookup: {
        from: 'workspace',
        let: { workspaceId: { $toObjectId: '$workspaceId' } },
        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$workspaceId'] } } }],
        as: 'workspace',
      },
    },
    { $unwind: '$workspace' },
    {
      $lookup: {
        from: 'teamMember',
        let: { workspaceId: '$workspaceId' },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ['$workspaceId', '$$workspaceId'] }, { $eq: ['$deletedAt', null] }] } } },
          { $count: 'count' },
        ],
        as: 'memberCount',
      },
    },
    {
      $project: {
        _id: 0,
        workspaceId: '$workspace._id',
        name: '$workspace.name',
        timezone: '$workspace.timezone',
        owner: '$workspace.owner',
        logo: '$workspace.logo',
        role: '$role',
        memberCount: { $ifNull: [{ $arrayElemAt: ['$memberCount.count', 0] }, 0] },
      },
    },
  ];
}
