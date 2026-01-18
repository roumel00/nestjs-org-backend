import { Module, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { SentryLoggerService } from './logger.service.js';

@Global()
@Module({
  providers: [
    {
      provide: SentryLoggerService,
      useFactory: () => {
        return new SentryLoggerService('Application');
      },
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
  exports: [SentryLoggerService],
})
export class LoggerModule {}

