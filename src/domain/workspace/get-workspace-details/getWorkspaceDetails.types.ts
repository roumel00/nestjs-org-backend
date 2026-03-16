export type GetWorkspaceDetailsRequest = Record<string, never>;

export type GetWorkspaceDetailsResponse = {
  name: string;
  logo: string | null;
  timezone: string;
};
