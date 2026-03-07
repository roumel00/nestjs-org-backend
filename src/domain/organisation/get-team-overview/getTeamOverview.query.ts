import { PipelineStage } from 'mongoose';

export function getOwnerQuery(orgId: string): PipelineStage[] {
  return [
    { $match: { orgId, deletedAt: null, role: 'owner' } },
  ];
}

export function getRoleCountsQuery(orgId: string): PipelineStage[] {
  return [
    { $match: { orgId, deletedAt: null, role: { $ne: 'owner' } } },
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ];
}

export function getRecentByRoleQuery(orgId: string, role: string, limit: number): PipelineStage[] {
  return [
    { $match: { orgId, deletedAt: null, role } },
    { $sort: { createdAt: 1 } },
    { $limit: limit },
  ];
}
