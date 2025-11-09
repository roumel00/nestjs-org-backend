import { Resend } from 'resend';
import type { SendOtpEmailParams } from './dto/email.dto.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({
  email,
  otp,
  subject,
  purpose,
}: SendOtpEmailParams): Promise<void> {
  const { error } = await resend.emails.send({
    from: 'verify@' + (process.env.EMAIL_DOMAIN ?? 'notifications.jakl.au'),
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