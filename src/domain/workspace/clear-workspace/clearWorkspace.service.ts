import { Injectable } from '@nestjs/common';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class ClearWorkspaceService {
  async clearWorkspace(req: Request): Promise<void> {
    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedWorkspace: '' },
    });
  }
}
