import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '../schemas/organisation.schema.js';
import { UserInOrg, UserInOrgDocument } from '../schemas/userInOrg.schema.js';
import { ObjectId } from 'mongodb';
import { auth } from '../../config/auth.js';

@Injectable()
export class UserInOrgService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(UserInOrg.name) private userInOrgModel: Model<UserInOrgDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    const userInOrgs = await this.userInOrgModel.find({
      userId: userId,
      deletedAt: null,
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
      };
    });

    return result;
  }

  async switchOrganisation(userId: string, orgId: string, req: Request): Promise<string> {
    const userInOrg = await this.userInOrgModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!userInOrg) {
      throw new UnauthorizedException('User is not a member of this organisation');
    }

    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: orgId }
    });

    return orgId;
  }

  async removeUser(orgId: string, userId: string) {
    const userInOrg = await this.userInOrgModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!userInOrg) {
      throw new NotFoundException('User not found');
    }

    if (userInOrg.role === 'owner' || userInOrg.role === 'admin') {
      throw new BadRequestException('Owner or admin cannot be removed from the organisation');
    }

    await this.userInOrgModel.updateOne({
      _id: userInOrg._id,
    }, { $set: { deletedAt: new Date() } }).exec();

    return { message: 'User removed from organisation successfully' }
  }

  async changeRole(orgId: string, userId: string, role: string) {
    const userInOrg = await this.userInOrgModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();
    
    if (!userInOrg) {
      throw new NotFoundException('User not found');
    }

    if (userInOrg.role === 'owner') {
      throw new BadRequestException('Owner cannot be changed to a different role');
    }
    
    await this.userInOrgModel.updateOne({
      _id: userInOrg._id,
    }, { $set: { role: role as 'owner' | 'admin' | 'member' } }).exec();

    return { message: 'Role changed successfully' }
  }
}

