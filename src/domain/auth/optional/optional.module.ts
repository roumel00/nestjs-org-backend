import { Module } from '@nestjs/common';
import { OptionalController } from './optional.controller.js';
import { OptionalService } from './optional.service.js';

@Module({
  controllers: [OptionalController],
  providers: [OptionalService],
})
export class OptionalModule {}
