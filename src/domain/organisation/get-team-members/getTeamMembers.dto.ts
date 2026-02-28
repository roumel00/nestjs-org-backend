export class GetTeamMembersResponse {
  id: string;
  orgId: string;
  email: string;
  userId: string | null;
  name: string | null;
  image: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  createdAt: Date;
}
