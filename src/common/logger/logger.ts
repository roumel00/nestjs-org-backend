import { SentryLoggerService } from './logger.service.js';

/**
 * Factory function to create a SentryLoggerService instance with a specific context.
 * This allows services to create their own logger instances with their class name as context.
 * 
 * @param context - The context/name for the logger (typically the class name)
 * @returns A SentryLoggerService instance configured with the given context
 * 
 * @example
 * ```typescript
 * export class MyService {
 *   private readonly logger = createSentryLogger(MyService.name);
 * 
 *   someMethod() {
 *     this.logger.log('Something happened', { userId: '123' });
 *   }
 * }
 * ```
 */
export function createSentryLogger(context: string): SentryLoggerService {
  return new SentryLoggerService(context);
}

