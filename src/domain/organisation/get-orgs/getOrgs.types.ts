export type GetOrgsRequest = Record<string, never>;

export type OrgSummary = {
  orgId: string;
  name: string;
  timezone: string;
  owner: string;
  logo: string | null;
  role: string;
  memberCount: number;
};

export type GetOrgsResponse = {
  orgs: OrgSummary[];
};
