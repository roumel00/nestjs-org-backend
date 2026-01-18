import { Controller, Get, Post, Delete, Body, Req, UseGuards, Param } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { TeamMemberService } from './teamMember.service.js';
import { SwitchOrganisationDto } from '../dto/switchOrganisation.dto.js';
import { RemoveUserDto } from './dto/removeUser.dto.js';
import { OrgMemberGuard } from '../../common/guards/orgMember.guard.js';
import { RoleGuard } from '../../common/guards/role.guard.js';
import { RequiredRole } from '../../common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../decorators/currentOrg.decorator.js';
import { ChangeRoleDto } from './dto/changeRole.dto.js';
import { InviteUserDto } from './dto/inviteUser.dto.js';
import { Throttle, minutes } from '@nestjs/throttler';
import { UserThrottlerGuard } from '../../common/guards/userThrottler.guard.js';

@Controller('organisations/team')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  getMyOrganisations(@Session() session: UserSession) {
    // No guard needed - just requires authentication (via @Session())
    return this.teamMemberService.getUserOrganisations(session.user.id);
  }

  @Get('currentOrg')
  getCurrentOrganisations(@Session() session: UserSession) {
    // No guard needed - just requires authentication (via @Session())
    return this.teamMemberService.getCurrentOrganisation(session);
  }

  @Post('switch')
  async switchOrganisation(
    @Session() session: UserSession,
    @Body() body: SwitchOrganisationDto,
    @Req() req: Request,
  ) {
    const newOrgId = await this.teamMemberService.switchOrganisation(
      session.user.id,
      body.orgId,
      req,
    );

    return { orgId: newOrgId };
  }

  @Post('removeUser')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async removeUser(@CurrentOrg() orgId: string, @Body() body: RemoveUserDto) {
    return this.teamMemberService.removeUser(orgId, body.userId);
  }

  @Post('changeRole')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async changeRole(@CurrentOrg() orgId: string, @Body() body: ChangeRoleDto) {
    return this.teamMemberService.changeRole(orgId, body.userId, body.role);
  }

  @Post('invite')
  @UseGuards(OrgMemberGuard, RoleGuard, UserThrottlerGuard)
  @Throttle({ default: { ttl: minutes(60), limit: 50 } })
  @RequiredRole('admin')
  async invite(@CurrentOrg() orgId: string, @Body() body: InviteUserDto) {
    return this.teamMemberService.invite(body.email, body.role, orgId);
  }

  @Delete('cancel/:inviteId')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('admin')
  async cancelInvite(@Param('inviteId') inviteId: string) {
    return this.teamMemberService.cancelInvite(inviteId);
  }
}

