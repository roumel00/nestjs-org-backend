export type GetCurrentOrgRequest = Record<string, never>;

export type CurrentOrgData = {
  teamMember: Record<string, any>;
  organisation: Record<string, any>;
};

export type GetCurrentOrgResponse = {
  currentOrg: CurrentOrgData | null;
};
