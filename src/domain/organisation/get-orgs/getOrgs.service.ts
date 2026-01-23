import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation, OrganisationDocument } from '../../../schemas/organisation.schema.js';
import { TeamMember, TeamMemberDocument } from '../../../schemas/teamMember.schema.js';
import { ObjectId } from 'mongodb';

@Injectable()
export class GetOrgsService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async getUserOrganisations(userId: string) {
    const teamMembers = await this.teamMemberModel.find({
      userId: userId,
      deletedAt: null,
    }).exec();

    if (teamMembers.length === 0 || !teamMembers) {
      return [];
    }

    const teamMemberMap = new Map(
      teamMembers.map(tm => [tm.orgId.toString(), tm])
    );

    // Get all organisation IDs
    const orgIds = teamMembers.map(tm => new ObjectId(tm.orgId));

    // Fetch all organisations
    const organisations: OrganisationDocument[] = await this.organisationModel.find({
      _id: { $in: orgIds },
    }).exec();

    // Combine teamMember data with organisation data
    const result = organisations.map((org: OrganisationDocument) => {
      const teamMember = teamMemberMap.get(org.id);

      return {
        orgId: org.id,
        name: org.name,
        timezone: org.timezone,
        owner: org.owner,
        role: teamMember!.role,
      };
    });

    return result;
  }
}
