import { Injectable, LoggerService, Logger } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class SentryLoggerService implements LoggerService {
  private readonly logger: Logger;
  private readonly context: string;

  constructor(context: string = 'Application') {
    this.context = context;
    this.logger = new Logger(context);
  }

  log(message: string, ...args: any[]) {
    // Log to console in NestJS style
    this.logger.log(message);
    
    // Also send to Sentry
    Sentry.logger.info(message, {
      context: this.context,
      ...this.parseArgs(args),
    });
  }

  error(message: string, trace?: string, ...args: any[]) {
    // Log to console in NestJS style
    this.logger.error(message, trace);
    
    // Also send to Sentry
    Sentry.logger.error(message, {
      trace,
      context: this.context,
      ...this.parseArgs(args),
    });
  }

  warn(message: string, ...args: any[]) {
    // Log to console in NestJS style
    this.logger.warn(message);
    
    // Also send to Sentry
    Sentry.logger.warn(message, {
      context: this.context,
      ...this.parseArgs(args),
    });
  }

  // Helper to parse additional arguments into structured data
  private parseArgs(args: any[]): Record<string, any> {
    if (args.length === 0) return {};
    
    // If first arg is an object, use it as context
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      return args[0];
    }
    
    // Otherwise, create a generic data object
    return { additionalData: args };
  }
}

