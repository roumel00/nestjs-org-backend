import { Injectable, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PasswordThrottlerGuard extends ThrottlerGuard {
  constructor(options: any, storageService: any, reflector: Reflector) {
    super(options, storageService, reflector);
  }

  protected async getTracker(req: any): Promise<string> {
    // Track by email for password reset routes
    // This ensures per-email rate limiting for unauthenticated users
    const email = req.body?.email;
    if (email) {
      return `password-reset:${email}`;
    }
    
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    
    return `password-reset:${email}`;
  }

  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    throw new ThrottlerException(
      'You can only request a password reset every 5 minutes. Please try again later'
    );
  }
}
