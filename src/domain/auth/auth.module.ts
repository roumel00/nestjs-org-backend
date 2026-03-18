import { Module } from '@nestjs/common';
import { ToggleThemeModule } from './toggle-theme/toggleTheme.module.js';

@Module({
  imports: [
    ToggleThemeModule,
  ],
})
export class AuthModule {}
