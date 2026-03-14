export type GetCurrentOrgRequest = Record<string, never>;

export type CurrentOrgTeamMember = {
  _id: string;
  orgId: string;
  email: string;
  userId: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  name: string | null;
  image: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentOrgOrganisation = {
  _id: string;
  owner: string;
  name: string;
  timezone: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentOrgData = {
  teamMember: CurrentOrgTeamMember;
  organisation: CurrentOrgOrganisation;
};

export type GetCurrentOrgResponse = {
  currentOrg: CurrentOrgData | null;
};
