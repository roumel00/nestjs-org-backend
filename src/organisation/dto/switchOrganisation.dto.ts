import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SwitchOrganisationDto {
  @IsMongoId({ message: 'Organisation ID must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  orgId: string;
}

