import nodemailer from 'nodemailer';
import config from '../config';
import logger from '../utils/logger';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465, // true for 465, false for other ports
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
): Promise<void> {
  const verificationUrl = `${config.apiUrl}/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: config.email.from,
    to: email,
    subject: 'Verify your Elevare account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Elevare, ${name}!</h2>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2d6a4f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          If you didn't create an account with Elevare, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Verification email sent', { email });
  } catch (error) {
    logger.error('Failed to send verification email', { email, error });
    throw new Error('Failed to send verification email');
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${config.corsOrigin}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: config.email.from,
    to: email,
    subject: 'Reset your Elevare password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2d6a4f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p style="color: #e63946; font-weight: bold;">This link will expire in 1 hour.</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent', { email });
  } catch (error) {
    logger.error('Failed to send password reset email', { email, error });
    throw new Error('Failed to send password reset email');
  }
}
