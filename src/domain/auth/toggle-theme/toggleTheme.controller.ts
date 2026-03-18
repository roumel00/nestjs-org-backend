import { Body, Controller, Post, Req } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ToggleThemeService } from './toggleTheme.service.js';
import { ToggleThemeRequest } from './toggleTheme.validator.js';

@Controller('user/theme')
export class ToggleThemeController {
  constructor(private readonly toggleThemeService: ToggleThemeService) {}

  @Post('toggle')
  async toggleTheme(
    @Session() session: UserSession,
    @Req() req: Request,
    @Body() body: ToggleThemeRequest,
  ) {
    return this.toggleThemeService.toggleTheme(session, req, body);
  }
}
