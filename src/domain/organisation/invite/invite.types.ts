export type InviteRequest = {
  email: string;
};

export type InviteResponse = {
  _id: string;
  orgId: string;
  email: string;
  userId: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
