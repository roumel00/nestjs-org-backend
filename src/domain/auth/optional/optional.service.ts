import { Injectable } from '@nestjs/common';
import { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class OptionalService {
  optional(session?: UserSession) {
    return { authenticated: !!session };
  }
}
