import { IsOptional, IsString } from 'class-validator';

export class GetTeamMembersRequest {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: string;
}

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

export class GetTeamMembersResponse {
  members: TeamMemberDto[];
  total: number;
  page: number;
  totalPages: number;
}
