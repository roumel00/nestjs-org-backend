import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../config/auth.js';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  getMe(session: UserSession) {
    return { user: session.user };
  }

  pub() {
    return { ok: true };
  }

  optional(session?: UserSession) {
    return { authenticated: !!session };
  }

  async deleteUser(req: Request, password: string) {
    const response = await auth.api.deleteUser({
      headers: req.headers,
      body: { password }
    });

    return response;
  }

}
