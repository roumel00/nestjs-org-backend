import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { InviteService } from './invite.service.js';
import { InviteRequest } from './invite.dto.js';
import { OrgMemberGuard } from '@common/guards/orgMember.guard.js';
import { RoleGuard } from '@common/guards/role.guard.js';
import { UserThrottlerGuard } from '@common/guards/userThrottler.guard.js';
import { RequiredRole } from '@common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '@domain/organisation/_decorators/currentOrg.decorator.js';

@Controller('organisations/team')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('invite')
  @UseGuards(OrgMemberGuard, RoleGuard, UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(60), limit: 50 } })
  @RequiredRole('admin')
  async invite(@CurrentOrg() orgId: string, @Body() body: InviteRequest) {
    return this.inviteService.invite(body.email, orgId);
  }
}
