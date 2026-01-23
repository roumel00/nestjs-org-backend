import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { PublicService } from './public.service.js';

@Controller('user')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('public')
  @AllowAnonymous()
  pub() {
    return this.publicService.pub();
  }
}
