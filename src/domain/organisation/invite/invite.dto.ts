import { IsString, IsNotEmpty } from 'class-validator';

export class InviteRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class InviteResponse {
  _id: string;
  orgId: string;
  email: string;
  userId: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
