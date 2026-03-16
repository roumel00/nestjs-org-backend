export type CreateWorkspaceRequest = {
  name: string;
  timezone: string;
  logo?: string;
};

export type CreateWorkspaceResponse = {
  _id: string;
  owner: string;
  name: string;
  timezone: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
};
