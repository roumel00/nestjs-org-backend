import { Injectable } from '@nestjs/common';
import { auth } from '@config/betterAuth.js';

@Injectable()
export class ClearOrgService {
  async clearOrganisation(req: Request): Promise<void> {
    await auth.api.updateUser({
      headers: req.headers,
      body: { lastAccessedOrg: '' },
    });
  }
}
