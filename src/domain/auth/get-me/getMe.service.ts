import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class GetMeService {
  getMe(session: UserSession) {
    return { user: session.user };
  }
}
