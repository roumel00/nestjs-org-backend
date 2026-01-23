import { Module } from '@nestjs/common';
import { GetMeController } from './getMe.controller.js';
import { GetMeService } from './getMe.service.js';

@Module({
  controllers: [GetMeController],
  providers: [GetMeService],
})
export class GetMeModule {}
