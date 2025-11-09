import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class DevelopmentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Check if in production
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException('This route is only available in development');
    }

    // Validate secret key from request body
    const developerSecret = process.env.DEVELOPER_SECRET;
    const providedSecret = request.body?.secret;

    if (!developerSecret || !providedSecret || providedSecret !== developerSecret) {
      throw new ForbiddenException('Invalid secret key');
    }

    return true;
  }
}