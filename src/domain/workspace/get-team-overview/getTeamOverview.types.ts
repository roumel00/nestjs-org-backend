export type GetTeamOverviewRequest = Record<string, never>;

export type TeamMemberDto = {
  id: string;
  workspaceId: string;
  email: string;
  userId: string | null;
  name: string | null;
  image: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  createdAt: Date;
};

export type RoleCounts = {
  admins: number;
  members: number;
  invitees: number;
};

export type GetTeamOverviewResponse = {
  owner: TeamMemberDto;
  counts: RoleCounts;
  recentAdmins: TeamMemberDto[];
  recentMembers: TeamMemberDto[];
};
