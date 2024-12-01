import { Resend } from 'resend';

const resend =
  process.env.RESEND_API_KEY && typeof window === 'undefined'
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  if (!resend) return;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href='${confirmLink}'>here</a> to confirm your email address.</p>`,
  });
};
