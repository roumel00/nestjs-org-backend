export type GetCurrentWorkspaceRequest = Record<string, never>;

export type CurrentWorkspaceTeamMember = {
  _id: string;
  workspaceId: string;
  email: string;
  userId: string | null;
  role: 'owner' | 'admin' | 'member' | 'invitee';
  name: string | null;
  image: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentWorkspaceWorkspace = {
  _id: string;
  owner: string;
  name: string;
  timezone: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentWorkspaceData = {
  teamMember: CurrentWorkspaceTeamMember;
  workspace: CurrentWorkspaceWorkspace;
};

export type GetCurrentWorkspaceResponse = {
  currentWorkspace: CurrentWorkspaceData | null;
};
