export class GetOrgsRequest {}

export class OrgSummary {
  orgId: string;
  name: string;
  timezone: string;
  owner: string;
  logo: string | null;
  role: string;
  memberCount: number;
}

export class GetOrgsResponse {
  orgs: OrgSummary[];
}
