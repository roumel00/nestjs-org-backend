import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '@schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { CreateOrgRequest } from './createOrg.dto.js';
import { auth } from '@config/betterAuth.js';
import { getDb } from '@config/database.js';

@Injectable()
export class CreateOrgService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async createOrganisation(userId: string, userEmail: string, createOrgDto: CreateOrgRequest, req: Request) {
    // Check if user already owns an organisation
    const existingOwnership = await this.teamMemberModel.findOne({
      userId: userId,
      role: 'owner',
      deletedAt: null,
    }).exec();

    if (existingOwnership) {
      throw new BadRequestException('You can only own one organisation');
    }

    // Create the organisation
    const organisation = new this.organisationModel({
      owner: userId,
      name: createOrgDto.name,
      timezone: createOrgDto.timezone,
      billingEmail: createOrgDto.email || null,
      phone: createOrgDto.phone || null,
      address: createOrgDto.address || null,
      website: createOrgDto.website || null,
      logo: createOrgDto.logo || null,
    });

    const savedOrganisation = await organisation.save();
    const orgId = savedOrganisation.id;

    // Fetch user data for denormalization
    const db = await getDb();
    const user = await db.collection('user').findOne({ email: userEmail });

    // Create teamMember entry for the owner
    const teamMember = new this.teamMemberModel({
      orgId: orgId,
      email: userEmail,
      userId: userId,
      role: 'owner',
      name: user?.name ?? null,
      image: user?.image ?? null,
    });

    await teamMember.save();

    // Update user's lastAccessedOrg
    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: orgId }
    });

    return savedOrganisation;
  }
}
