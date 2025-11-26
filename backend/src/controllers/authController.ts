import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as authService from '../services/authService';
import * as emailService from '../services/emailService';
import logger from '../utils/logger';

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const { email, password, name } = req.body;

    // Register user
    const { user, token } = await authService.register({
      email,
      password,
      name,
    });

    // Send verification email (don't wait for it)
    // In a real application, you would generate a verification token
    // For now, we'll skip the actual email sending in development
    if (process.env.NODE_ENV === 'production') {
      const verificationToken = authService.generateResetToken();
      emailService
        .sendVerificationEmail(email, name, verificationToken)
        .catch((error) => {
          logger.error('Failed to send verification email', { error });
        });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error: any) {
    logger.error('Registration error', { error: error.message });

    if (error.message === 'User with this email already exists') {
      res.status(409).json({
        error: {
          code: 'USER_EXISTS',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(500).json({
      error: {
        code: 'REGISTRATION_FAILED',
        message: 'Failed to register user',
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Login a user
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const { email, password } = req.body;

    // Login user
    const { user, token } = await authService.login({ email, password });

    res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error: any) {
    logger.error('Login error', { error: error.message });

    if (error.message === 'Invalid credentials') {
      res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(500).json({
      error: {
        code: 'LOGIN_FAILED',
        message: 'Failed to login',
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Get current user
 * GET /api/auth/me
 */
export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;

    const user = await authService.findById(userId);

    if (!user) {
      res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    logger.error('Get current user error', { error: error.message });

    res.status(500).json({
      error: {
        code: 'FETCH_USER_FAILED',
        message: 'Failed to fetch user',
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Update user profile
 * PUT /api/auth/profile
 */
export async function updateProfile(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const userId = req.user!.userId;
    const { name, bio, avatar_url } = req.body;

    const user = await authService.updateProfile(userId, {
      name,
      bio,
      avatar_url,
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error: any) {
    logger.error('Update profile error', { error: error.message });

    if (error.message === 'User not found') {
      res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    if (error.message === 'No fields to update') {
      res.status(400).json({
        error: {
          code: 'NO_FIELDS_TO_UPDATE',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(500).json({
      error: {
        code: 'UPDATE_PROFILE_FAILED',
        message: 'Failed to update profile',
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Request password reset
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const { email } = req.body;

    // Create reset token
    const resetToken = await authService.createPasswordResetToken(email);

    // Get user for email
    const user = await authService.findByEmail(email);

    // Send reset email
    if (user) {
      await emailService.sendPasswordResetEmail(
        email,
        user.name,
        resetToken
      );
    }

    // Always return success to prevent email enumeration
    res.status(200).json({
      message:
        'If an account exists with this email, a password reset link has been sent',
    });
  } catch (error: any) {
    logger.error('Forgot password error', { error: error.message });

    // Don't reveal if user exists or not
    res.status(200).json({
      message:
        'If an account exists with this email, a password reset link has been sent',
    });
  }
}

/**
 * Reset password with token
 * POST /api/auth/reset-password
 */
export async function resetPassword(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array(),
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const { token, newPassword } = req.body;

    // Reset password
    await authService.resetPassword(token, newPassword);

    res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error: any) {
    logger.error('Reset password error', { error: error.message });

    if (error.message === 'Invalid or expired reset token') {
      res.status(400).json({
        error: {
          code: 'INVALID_TOKEN',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(500).json({
      error: {
        code: 'RESET_PASSWORD_FAILED',
        message: 'Failed to reset password',
        timestamp: new Date().toISOString(),
      },
    });
  }
}
