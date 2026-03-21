import "./instrument.js";

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // required so Better Auth can read raw body
  });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      ...(process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3050', 'http://localhost:3000']),
      ...(process.env.NODE_ENV !== 'production'
        ? [/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/]
        : []),
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'expo-origin'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3113);
}
bootstrap();
