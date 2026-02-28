import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { emailOTP } from 'better-auth/plugins';
import { getDb, mongoClient } from './database.js';
import { createAuthMiddleware } from 'better-auth/api';
import { sendOtpEmail } from './email.js';
import { handleUserSignup } from './signup.js';

const db = await getDb();
const client = mongoClient();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  trustedOrigins: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3050', 'http://localhost:3000'],

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
      lastAccessedOrg: { type: 'string', required: false }
    },
    deleteUser: { 
      enabled: true
    } 
  },

  plugins: [
    emailOTP({ 
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
      sendVerificationOnSignUp: true,
      otpLength: 6,
      expiresIn: 300,
    }) 
  ],

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith('/sign-up') && ctx.context.newSession) {
        const userId = ctx.context.newSession.user.id;
        const user = ctx.context.newSession.user;

        await handleUserSignup(
          userId,
          user.email,
        );
      }

      if (ctx.path === '/update-user' && ctx.context.session) {
        const userId = ctx.context.session.user.id;
        const user = ctx.context.session.user as Record<string, any>;
        await db.collection('teamMember').updateMany(
          { userId, deletedAt: null },
          { $set: {
            name: user.name ?? null,
            image: user.image ?? null,
          } },
        );
      }
    }),
  },
});
