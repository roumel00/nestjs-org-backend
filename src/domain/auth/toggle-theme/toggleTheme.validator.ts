import { IsIn } from 'class-validator';

export class ToggleThemeRequest {
  @IsIn(['web', 'mobile'])
  platform: 'web' | 'mobile';
}
