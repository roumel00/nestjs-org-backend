import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SwitchWorkspaceRequest {
  @IsMongoId({ message: 'Workspace ID must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  workspaceId: string;
}
