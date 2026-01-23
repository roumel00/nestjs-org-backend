import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicService {
  pub() {
    return { ok: true };
  }
}
