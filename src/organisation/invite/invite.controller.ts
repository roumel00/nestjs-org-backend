import { Controller, Post, Delete, Body, UseGuards, Param } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { InviteService } from './invite.service.js';
import { InviteUserDto } from './dto/inviteUser.dto.js';
import { RoleGuard } from '../../common/guards/role.guard.js';
import { OrgMemberGuard } from '../../common/guards/orgMember.guard.js';
import { RequiredRole } from '../../common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../decorators/currentOrg.decorator.js';
import { UserThrottlerGuard } from 'src/common/guards/userThrottler.guard.js';

@Controller('organisations/invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @UseGuards(OrgMemberGuard, RoleGuard, UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(60), limit: 50 } })
  @RequiredRole('admin')
  async invite(@CurrentOrg() orgId: string, @Body() body: InviteUserDto) {
    return this.inviteService.invite(body.email, body.role, orgId);
  }

  @Delete('cancel/:inviteId')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async cancelInvite(@Param('inviteId') inviteId: string) {
    return this.inviteService.cancelInvite(inviteId);
  }
}
