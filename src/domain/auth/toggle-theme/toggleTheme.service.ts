import { Injectable } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '@config/betterAuth.js';
import type { ToggleThemeRequest, ToggleThemeResponse } from './toggleTheme.types.js';

const PLATFORM_FIELD = {
  web: 'themeWeb',
  mobile: 'themeMobile',
} as const;

@Injectable()
export class ToggleThemeService {
  async toggleTheme(
    session: UserSession,
    req: Request,
    body: ToggleThemeRequest,
  ): Promise<ToggleThemeResponse> {
    const field = PLATFORM_FIELD[body.platform];
    const currentTheme = ((session.user as Record<string, unknown>)[field] as string) ?? 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    await auth.api.updateUser({
      headers: req.headers,
      body: { [field]: newTheme },
    });

    return { theme: newTheme as 'light' | 'dark' };
  }
}
