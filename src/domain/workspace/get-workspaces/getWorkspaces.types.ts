export type GetWorkspacesRequest = Record<string, never>;

export type WorkspaceSummary = {
  workspaceId: string;
  name: string;
  timezone: string;
  owner: string;
  logo: string | null;
  role: string;
  memberCount: number;
};

export type GetWorkspacesResponse = {
  workspaces: WorkspaceSummary[];
};
