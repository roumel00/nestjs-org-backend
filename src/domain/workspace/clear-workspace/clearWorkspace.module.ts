import { Module } from '@nestjs/common';
import { ClearWorkspaceController } from './clearWorkspace.controller.js';
import { ClearWorkspaceService } from './clearWorkspace.service.js';

@Module({
  controllers: [ClearWorkspaceController],
  providers: [ClearWorkspaceService],
})
export class ClearWorkspaceModule {}
