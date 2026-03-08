import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '@schemas/organisation.schema.js';
import { UpdateOrgDetailsRequest, UpdateOrgDetailsResponse } from './updateOrgDetails.dto.js';

@Injectable()
export class UpdateOrgDetailsService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
  ) {}

  async updateOrgDetails(orgId: string, dto: UpdateOrgDetailsRequest): Promise<UpdateOrgDetailsResponse> {
    const update: Record<string, any> = {};

    if (dto.name !== undefined) update.name = dto.name;
    if (dto.timezone !== undefined) update.timezone = dto.timezone;
    if (dto.logo !== undefined) update.logo = dto.logo;

    const organisation = await this.organisationModel.findByIdAndUpdate(
      orgId,
      { $set: update },
      { new: true },
    ).exec();

    if (!organisation) {
      throw new NotFoundException('Organisation not found');
    }

    return {
      name: organisation.name,
      logo: organisation.logo ?? null,
      timezone: organisation.timezone,
    };
  }
}
