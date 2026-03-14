export type CreateOrgRequest = {
  name: string;
  timezone: string;
  logo?: string;
};

export type CreateOrgResponse = {
  _id: string;
  owner: string;
  name: string;
  timezone: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
};
