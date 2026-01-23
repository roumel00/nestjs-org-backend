import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SwitchOrgRequest {
  @IsMongoId({ message: 'Organisation ID must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  orgId: string;
}
