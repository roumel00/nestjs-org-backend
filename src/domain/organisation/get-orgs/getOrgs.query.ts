import { PipelineStage } from 'mongoose';

export function getUserOrganisationsQuery(userId: string): PipelineStage[] {
  return [
    { $match: { userId, deletedAt: null } },
    {
      $lookup: {
        from: 'organisation',
        let: { orgId: { $toObjectId: '$orgId' } },
        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$orgId'] } } }],
        as: 'org',
      },
    },
    { $unwind: '$org' },
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
  ];
}
