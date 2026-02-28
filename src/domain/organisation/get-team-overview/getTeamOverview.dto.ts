export class TeamMemberDto {
  id: string;
  orgId: string;
  email: string;
  userId: string | null;
  name: string | null;
  image: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  createdAt: Date;
}

export class RoleCounts {
  admins: number;
  members: number;
  invitees: number;
}

export class GetTeamOverviewResponse {
  owner: TeamMemberDto;
  counts: RoleCounts;
  recentAdmins: TeamMemberDto[];
  recentMembers: TeamMemberDto[];
}
