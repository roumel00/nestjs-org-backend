import { getDb } from './database.js';
import { ObjectId } from 'mongodb';

export async function handleUserSignup(
  userId: string,
  userEmail: string,
  userName: string,
  timezone?: string,
): Promise<string> {
  const db = await getDb();
  
  // Create default organisation using native MongoDB driver
  const organisationResult = await db.collection('organisation').insertOne({
    owner: userId,
    name: `${userName}'s Organisation`,
    timezone: timezone || 'UTC',
    address: null,
    phone: null,
    website: null,
    billingEmail: null,
    logo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const defaultOrgId = organisationResult.insertedId.toString();

  // Create userInOrg for default organisation
  await db.collection('userInOrg').insertOne({
    orgId: defaultOrgId,
    userId: userId,
    role: 'owner',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const invites = await db.collection('inviteInOrg').find({
    email: userEmail,
    deletedAt: null,
  }).toArray();

  let lastAccessedOrg = defaultOrgId;

  if (invites.length > 0) {
    // Create userInOrg for each invite
    const userInOrgDocs = invites.map(invite => ({
        orgId: invite.orgId,
        userId: userId,
        role: invite.role,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    if (userInOrgDocs.length > 0) {
      await db.collection('userInOrg').insertMany(userInOrgDocs);
    }

    // Delete the consumed invites
    const inviteIds = invites.map(invite => invite._id);
    await db.collection('inviteInOrg').deleteMany({
      _id: { $in: inviteIds },
    });

    // Set lastAccessedOrg to the first invite's org
    lastAccessedOrg = invites[0].orgId.toString();
    console.log(`[Signup] Set lastAccessedOrg to: ${lastAccessedOrg}`);
  }

  // Update user with lastAccessedOrg
  await db.collection('user').updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastAccessedOrg: lastAccessedOrg } }
  );

  return lastAccessedOrg;
}

