import { getDb } from './database.js';
import { ObjectId } from 'mongodb';

export async function handleUserSignup(
  userId: string,
  userEmail: string,
): Promise<string | null> {
  const db = await getDb();
  
  const invites = await db.collection('teamMember').find({
    email: userEmail,
    userId: null,
    deletedAt: null,
  }).toArray();

  let lastAccessedOrg: string | null = null;

  if (invites.length > 0) {
    // Update invites to link them to the user
    const inviteIds = invites.map(invite => invite._id);
    await db.collection('teamMember').updateMany(
      { _id: { $in: inviteIds } },
      { $set: { userId: userId, role: 'member', updatedAt: new Date() } }
    );

    // Set lastAccessedOrg to the first invite's org
    lastAccessedOrg = invites[0].orgId.toString();
    console.log(`[Signup] Set lastAccessedOrg to: ${lastAccessedOrg}`);
  }

  // Update user with lastAccessedOrg (may be null if no invites)
  await db.collection('user').updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastAccessedOrg: lastAccessedOrg } }
  );

  return lastAccessedOrg;
}

