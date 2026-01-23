import { Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, minutes } from '@nestjs/throttler';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GuardsModule } from '@common/guards/guards.module.js';
import { LoggerModule } from '@common/logger/logger.module.js';
import { auth } from '@config/betterAuth.js';
import { AuthModule as DomainAuthModule } from '@domain/auth/auth.module.js';
import { OrganisationModule } from '@domain/organisation/organisation.module.js';
import { MediaModule } from '@domain/media/media.module.js';

@Module({
  imports: [
    SentryModule.forRoot(),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('DATABASE'),
      }),
      inject: [ConfigService],
    }),
    AuthModule.forRoot({ auth }),
    ThrottlerModule.forRoot([
      { ttl: minutes(5), limit: 1 },
    ]),
    GuardsModule,
    DomainAuthModule,
    OrganisationModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
