export type GetOrgDetailsRequest = Record<string, never>;

export type GetOrgDetailsResponse = {
  name: string;
  logo: string | null;
  timezone: string;
};
