import mongoose from 'mongoose';
import { getDb } from './database.js';
import { ObjectId } from 'mongodb';
import { Organisation, OrganisationSchema } from '../organisation/schemas/organisation.schema.js';
import { UserInOrg, UserInOrgSchema } from '../organisation/schemas/userInOrg.schema.js';
import { InviteInOrg, InviteInOrgSchema } from '../organisation/schemas/inviteInOrg.schema.js';

export async function handleUserSignup(
  userId: string,
  userEmail: string,
  userName: string,
  timezone?: string,
): Promise<string> {
  const db = await getDb();
  
  // Get Mongoose models (will return existing if already registered by NestJS)
  const OrganisationModel = mongoose.model(Organisation.name, OrganisationSchema);
  const UserInOrgModel = mongoose.model(UserInOrg.name, UserInOrgSchema);
  const InviteInOrgModel = mongoose.model(InviteInOrg.name, InviteInOrgSchema);

  // Create default organisation
  const organisation = new OrganisationModel({
    owner: userId,
    name: `${userName}'s Organisation`,
    timezone: timezone || 'UTC',
    address: null,
    abn: null,
    licenseNumber: null,
    phone: null,
    website: null,
    billingEmail: null,
    logo: null,
  });

  const savedOrganisation = await organisation.save();
  const defaultOrgId = savedOrganisation._id.toString();

  // Create userInOrg for default organisation
  const userInOrg = new UserInOrgModel({
    orgId: defaultOrgId,
    userId: userId,
    role: 'owner',
  });

  await userInOrg.save();

  // Find invites matching the user's email
  const invites = await InviteInOrgModel.find({
    email: userEmail,
    deletedAt: null,
  }).exec();

  let lastAccessedOrg = defaultOrgId;

  if (invites.length > 0) {
    // Create userInOrg for each invite
    const userInOrgDocs = invites.map(invite => 
      new UserInOrgModel({
        orgId: invite.orgId,
        userId: userId,
        role: invite.role,
      })
    );

    if (userInOrgDocs.length > 0) {
      await UserInOrgModel.insertMany(userInOrgDocs);
    }

    // Delete the consumed invites
    const inviteIds = invites.map(invite => invite._id);
    await InviteInOrgModel.deleteMany({
      _id: { $in: inviteIds },
    });

    // Set lastAccessedOrg to the first invite's org
    lastAccessedOrg = invites[0].orgId.toString();
  }

  // Update user with lastAccessedOrg (still using native driver for user collection)
  await db.collection('user').updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastAccessedOrg: lastAccessedOrg } }
  );

  return lastAccessedOrg;
}

