export class GetCurrentOrgRequest {}

export class CurrentOrgData {
  teamMember: Record<string, any>;
  organisation: Record<string, any>;
}

export class GetCurrentOrgResponse {
  currentOrg: CurrentOrgData | null;
}
