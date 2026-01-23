import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '@schemas/teamMember.schema.js';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class SwitchOrgService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async switchOrganisation(userId: string, orgId: string, req: Request): Promise<string> {
    const teamMember = await this.teamMemberModel.findOne({
      userId: userId,
      orgId: orgId,
      deletedAt: null,
    }).exec();

    if (!teamMember) {
      throw new UnauthorizedException('User is not a member of this organisation');
    }

    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: orgId }
    });

    return orgId;
  }
}
