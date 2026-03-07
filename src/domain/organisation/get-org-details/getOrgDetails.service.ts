import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Organisation, OrganisationDocument } from '@schemas/organisation.schema.js';
import { S3_PUBLIC_URL } from '@config/s3.js';
import { GetOrgDetailsResponse } from './getOrgDetails.dto.js';

type ExtendedUserSession = UserSession & {
  user: UserSession['user'] & {
    lastAccessedOrg?: string;
  };
};

@Injectable()
export class GetOrgDetailsService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
  ) {}

  async getOrgDetails(session: ExtendedUserSession): Promise<GetOrgDetailsResponse> {
    const organisation = await this.organisationModel.findById(
      session.user.lastAccessedOrg,
    ).exec();

    if (!organisation) {
      throw new NotFoundException('Organisation not found');
    }

    return {
      name: organisation.name,
      logo: organisation.logo ? `${S3_PUBLIC_URL}/${organisation.logo}` : null,
      timezone: organisation.timezone,
    };
  }
}
