import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../config/auth.js';
import { Organisation, OrganisationDocument } from '../organisation/schemas/organisation.schema.js';
import { UserInOrg, UserInOrgDocument } from '../organisation/schemas/userInOrg.schema.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<OrganisationDocument>,
    @InjectModel(UserInOrg.name) private userInOrgModel: Model<UserInOrgDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getMe(session: UserSession) {
    return { user: session.user };
  }

  pub() {
    return { ok: true };
  }

  optional(session?: UserSession) {
    return { authenticated: !!session };
  }

  async deleteUser(req: Request, session: UserSession, password: string) {
    const userId = session.user.id;
    
    const ownerUserInOrgs = await this.userInOrgModel.find({
      userId: userId,
      role: 'owner'
    }).select('orgId').lean().exec();

    const ownerOrgIds = ownerUserInOrgs.map(uio => uio.orgId);

    await this.userInOrgModel.deleteMany({
      userId: userId,
    }).exec();

    if (ownerOrgIds.length > 0) {
      await Promise.all([
        this.userInOrgModel.deleteMany({
          orgId: { $in: ownerOrgIds }
        }).exec(),
        this.organisationModel.deleteMany({
          _id: { $in: ownerOrgIds }
        }).exec()
      ]);
    }

    const response = await auth.api.deleteUser({
      headers: req.headers,
      body: { password }
    });

    return response;
  }

}
