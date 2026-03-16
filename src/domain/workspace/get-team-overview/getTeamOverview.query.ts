import { PipelineStage } from 'mongoose';

export function getOwnerQuery(workspaceId: string): PipelineStage[] {
  return [
    { $match: { workspaceId, deletedAt: null, role: 'owner' } },
  ];
}

export function getRoleCountsQuery(workspaceId: string): PipelineStage[] {
  return [
    { $match: { workspaceId, deletedAt: null, role: { $ne: 'owner' } } },
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ];
}

export function getRecentByRoleQuery(workspaceId: string, role: string, limit: number): PipelineStage[] {
  return [
    { $match: { workspaceId, deletedAt: null, role } },
    { $sort: { createdAt: 1 } },
    { $limit: limit },
  ];
}
