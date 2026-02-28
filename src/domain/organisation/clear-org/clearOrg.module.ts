import { Module } from '@nestjs/common';
import { ClearOrgController } from './clearOrg.controller.js';
import { ClearOrgService } from './clearOrg.service.js';

@Module({
  controllers: [ClearOrgController],
  providers: [ClearOrgService],
})
export class ClearOrgModule {}
