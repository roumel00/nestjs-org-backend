export type DeleteUserRequest = {
  password: string;
  secret: string;
};

export type DeleteUserResponse = {
  success: boolean;
};
