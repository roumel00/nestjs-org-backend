import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  constructor(options: any, storageService: any, reflector: Reflector) {
    super(options, storageService, reflector);
  }

  protected async getTracker(req: any): Promise<string> {
    // Use user ID from session if available, otherwise fall back to IP
    // This ensures per-user rate limiting
    const session: UserSession | undefined = req.session;
    return session?.user?.id || req.ip;
  }

  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const url = request.url || request.route?.path || '';

    if (url.includes('verify/resend')) {
      throw new ThrottlerException(
        'You can only receive a verification email every 5 minutes. Please try again later'
      );
    }
    
    throw new ThrottlerException(
      'Too many requests. Please try again later.'
    );
  }
}