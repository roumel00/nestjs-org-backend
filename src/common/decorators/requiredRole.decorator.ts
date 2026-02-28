import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ROLE_KEY = 'requiredRole';

export const RequiredRole = (role: 'owner' | 'admin' | 'member' | 'invitee') =>
  SetMetadata(REQUIRED_ROLE_KEY, role);
