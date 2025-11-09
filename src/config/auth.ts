import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { emailOTP } from 'better-auth/plugins';
import { getDb, mongoClient } from './database.js';
import { createAuthMiddleware } from 'better-auth/api';
import { ObjectId } from 'mongodb';
import { sendOtpEmail } from './email.js';

const db = await getDb();
const client = mongoClient();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  trustedOrigins: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3050'],

  database: mongodbAdapter(db, { client: client }),

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  user: {
    additionalFields: {
      firstName: { type: 'string', required: true, input: true },
      lastName: { type: 'string', required: true, input: true },
      image: { type: 'string', required: false, input: true },
      profession: { type: 'string', required: false, input: true },
      lastAccessedOrg: { type: 'string', required: false }
    },
    deleteUser: { 
      enabled: true
    } 
  },

  plugins: [
    emailOTP({ 
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,

      async sendVerificationOTP({ email, otp, type }) { 
        if (type === "email-verification") { 
          await sendOtpEmail({ 
            email,
            otp,
            subject: `Your One Time Password is ${otp}`,
            purpose: 'Enter this code to verify your email.'
          });
        } else if (type === "forget-password") { 
          await sendOtpEmail({ 
            email,
            otp,
            subject: `Your One Time Password is ${otp}`,
            purpose: 'Enter this code to reset your password.'
          });
        }
      }, 
    }) 
  ],

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith('/sign-up') && ctx.context.newSession) {
        const userId = ctx.context.newSession.user.id;
        const user = ctx.context.newSession.user;

        const organisation = await db.collection('organisation').insertOne({
          owner: userId,
          name: `${user.name}'s Organisation`, // Default name
          timezone: ctx.body?.timezone || 'UTC',
          address: null,
          abn: null,
          licenseNumber: null,
          phone: null,
          website: null,
          billingEmail: null,
          logo: null,
          createdAt: new Date(),
        });

        const orgId = organisation.insertedId;

        await db.collection('userInOrg').insertOne({
          orgId: orgId,
          userId: userId,
          role: 'owner',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await db.collection('user').updateOne(
          { _id: new ObjectId(userId) },
          { $set: { lastAccessedOrg: orgId.toString() } }
        );

        ctx.setHeader('x-org-id', orgId.toString());
      }

      if (ctx.path.startsWith('/sign-in') && ctx.context.newSession) {
        const user = ctx.context.newSession.user;

        ctx.setHeader('x-org-id', user.lastAccessedOrg);
      }
    }),
  },
});
