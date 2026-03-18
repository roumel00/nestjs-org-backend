import { Module } from '@nestjs/common';
import { ToggleThemeController } from './toggleTheme.controller.js';
import { ToggleThemeService } from './toggleTheme.service.js';

@Module({
  controllers: [ToggleThemeController],
  providers: [ToggleThemeService],
})
export class ToggleThemeModule {}
