import { Resend } from 'resend';
import { sendVerificationEmail } from '@/lib/mail';

jest.mock('resend', () => {
  const mockSend = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

describe('sendVerificationEmail', () => {
  const mockEmail = 'test@example.com';
  const mockToken = 'test-token';
  let mockSend: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    const resendInstance = new Resend();
    mockSend = resendInstance.emails.send as jest.Mock;
  });

  it('should call Resend.emails.send with the correct arguments', async () => {
    const expectedConfirmLink = `http://localhost:3000/auth/new-verification?token=${mockToken}`;

    await sendVerificationEmail(mockEmail, mockToken);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      from: 'onboarding@resend.dev',
      to: mockEmail,
      subject: 'Confirm your email',
      html: `<p>Click <a href='${expectedConfirmLink}'>here</a> to confirm your email address.</p>`,
    });
  });

  it('should throw an error if Resend.emails.send fails', async () => {
    const mockError = new Error('Send failed');
    mockSend.mockRejectedValueOnce(mockError);

    await expect(sendVerificationEmail(mockEmail, mockToken)).rejects.toThrow(
      'Send failed',
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
