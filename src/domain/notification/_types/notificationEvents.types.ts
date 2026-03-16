export type InviteSentEvent = {
  workspaceId: string;
  actorId: string;
  actorName: string;
  inviteeEmail: string;
};

export type InviteCancelledEvent = {
  workspaceId: string;
  actorId: string;
  actorName: string;
  inviteeEmail: string;
};

export type RoleChangedEvent = {
  workspaceId: string;
  actorId: string;
  actorName: string;
  targetId: string;
  targetName: string;
  newRole: string;
  previousRole: string;
};

export type MemberRemovedEvent = {
  workspaceId: string;
  actorId: string;
  actorName: string;
  targetName: string;
  targetEmail: string;
};
