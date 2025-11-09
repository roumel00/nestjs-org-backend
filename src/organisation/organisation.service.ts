import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from './schemas/organisation.schema.js';
import { UserInOrg, UserInOrgDocument } from './schemas/userInOrg.schema.js';
import { ObjectId } from 'mongodb';
import { auth } from '../config/auth.js';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(UserInOrg.name) private userInOrgModel: Model<UserInOrgDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    const userInOrgs = await this.userInOrgModel.find({
      userId: userId,
    }).exec();

    if (userInOrgs.length === 0 || !userInOrgs) {
      return [];
    }

    const userInOrgMap = new Map(
      userInOrgs.map(uio => [uio.orgId.toString(), uio])
    );

    // Get all organisation IDs
    const orgIds = userInOrgs.map(uio => new ObjectId(uio.orgId));

    // Fetch all organisations
    const organisations: OrganisationDocument[] = await this.organisationModel.find({
      _id: { $in: orgIds },
    }).exec();

    // Combine userInOrg data with organisation data
    const result = organisations.map((org: OrganisationDocument) => {
      const userInOrg = userInOrgMap.get(org.id);
      
      return {
        orgId: org.id,
        name: org.name,
        timezone: org.timezone,
        owner: org.owner,
        role: userInOrg!.role,
        createdAt: org.createdAt
      };
    });

    return result;
  }

  async switchOrganisation(userId: string, orgId: string, req: Request): Promise<string> {
    const userInOrg = await this.userInOrgModel.findOne({
      userId: userId,
      orgId: orgId,
    }).exec();

    if (!userInOrg) {
      throw new UnauthorizedException('User is not a member of this organization');
    }

    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: orgId }
    });

    return orgId;
  }
}
