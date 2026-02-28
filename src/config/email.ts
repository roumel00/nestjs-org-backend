import { Resend } from 'resend';

export interface SendOtpEmailParams {
  email: string;
  otp: string;
  subject: string;
  purpose: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({
  email,
  otp,
  subject,
  purpose,
}: SendOtpEmailParams): Promise<void> {
  const { error } = await resend.emails.send({
    from: 'verify@' + (process.env.EMAIL_DOMAIN ?? 'notifications.jakl.au'), // TODO: make sure this is your email domain
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 8px;">${subject}</h2>
        <p>${purpose}</p>
        <p style="margin-top: 20px; margin-bottom: 4px;">Your code:</p>
        <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">
          ${otp}
        </p>
        <p style="color: #666; margin-top: 16px;">This code expires in 5 minutes.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
}

export async function sendInviteEmail({
  email,
  orgName,
  role,
  existingUser,
}: {
  email: string;
  orgName: string;
  role: string;
  existingUser: boolean;
}): Promise<void> {
  const appUrl = process.env.FRONTEND_URL; // TODO: change this to the frontend URL
  const signUpEndpoint = "/signup"; // TODO: change this to the sign up endpoint
  
  let html: string;
  if (existingUser) {
    // Existing user - tell them to switch to the new org
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 8px;">You've been invited!</h2>
        <p>You've been invited to join <strong>${orgName}</strong> as a <strong>${role}</strong>.</p>
        <p>You can now switch to this organisation in your account settings.</p>
        <p style="margin-top: 20px;">
          <a href="${appUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Go to Platform
          </a>
        </p>
        <p style="color: #666; margin-top: 16px;">
          If you didn't expect this invitation, you can safely ignore this email.
        </p>
      </div>
    `;
  } else {
    // New user - give them signup link
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 8px;">You've been invited!</h2>
        <p>You've been invited to join <strong>${orgName}</strong> as a <strong>${role}</strong>.</p>
        <p>Sign up to accept this invitation and get started.</p>
        <p style="margin-top: 20px;">
          <a href="${appUrl}${signUpEndpoint}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Sign Up to Accept
          </a>
        </p>
        <p style="color: #666; margin-top: 16px;">
          If you didn't expect this invitation, you can safely ignore this email.
        </p>
      </div>
    `;
  }

  const { error } = await resend.emails.send({
    from: 'noreply@' + (process.env.EMAIL_DOMAIN ?? 'notifications.jakl.au'),
    to: email,
    subject: `You've been invited to join ${orgName}`,
    html,
  });

  if (error) {
    console.error('Failed to send invite email:', error);
    throw new Error('Failed to send invite email');
  }
}
