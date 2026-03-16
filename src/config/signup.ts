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

  let lastAccessedWorkspace: string | null = null;

  if (invites.length > 0) {
    // Fetch user data for denormalization
    const user = await db.collection('user').findOne({ _id: new ObjectId(userId) });

    // Update invites to link them to the user
    const inviteIds = invites.map(invite => invite._id);
    await db.collection('teamMember').updateMany(
      { _id: { $in: inviteIds } },
      { $set: {
        userId: userId,
        role: 'member',
        name: user?.name ?? null,
        image: user?.image ?? null,
        updatedAt: new Date(),
      } }
    );

    // Set lastAccessedWorkspaceto the first invite's workspace
    lastAccessedWorkspace= invites[0].workspaceId.toString();
    console.log(`[Signup] Set lastAccessedWorkspaceto: ${lastAccessedWorkspace}`);
  }

  // Update user with lastAccessedWorkspace(may be null if no invites)
  await db.collection('user').updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastAccessedWorkspace: lastAccessedWorkspace} }
  );

  return lastAccessedWorkspace;
}

