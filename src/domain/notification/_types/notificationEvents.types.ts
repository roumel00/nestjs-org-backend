export type InviteSentEvent = {
  orgId: string;
  actorId: string;
  actorName: string;
  inviteeEmail: string;
};

export type InviteCancelledEvent = {
  orgId: string;
  actorId: string;
  actorName: string;
  inviteeEmail: string;
};

export type RoleChangedEvent = {
  orgId: string;
  actorId: string;
  actorName: string;
  targetId: string;
  targetName: string;
  newRole: string;
  previousRole: string;
};

export type MemberRemovedEvent = {
  orgId: string;
  actorId: string;
  actorName: string;
  targetName: string;
  targetEmail: string;
};
