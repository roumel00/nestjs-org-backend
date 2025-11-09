import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, minutes } from '@nestjs/throttler';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GuardsModule } from './common/guards/guards.module.js';
import { auth } from './config/auth.js';
import { OrganisationModule } from './organisation/organisation.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
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
    UserModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
