import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetWorkspaceDetailsController } from './getWorkspaceDetails.controller.js';
import { GetWorkspaceDetailsService } from './getWorkspaceDetails.service.js';
import { Workspace, WorkspaceSchema } from '@schemas/workspace.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [GetWorkspaceDetailsController],
  providers: [GetWorkspaceDetailsService],
})
export class GetWorkspaceDetailsModule {}
