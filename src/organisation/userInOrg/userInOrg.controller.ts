import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { UserInOrgService } from './userInOrg.service.js';
import { SwitchOrganisationDto } from '../dto/switchOrganisation.dto.js';
import { RemoveUserDto } from './dto/removeUser.dto.js';
import { OrgMemberGuard } from '../../common/guards/orgMember.guard.js';
import { RoleGuard } from '../../common/guards/role.guard.js';
import { RequiredRole } from '../../common/decorators/requiredRole.decorator.js';
import { CurrentOrg } from '../decorators/currentOrg.decorator.js';
import { ChangeRoleDto } from './dto/changeRole.dto.js';


@Controller('organisations/user')
export class UserInOrgController {
  constructor(private readonly userInOrgService: UserInOrgService) {}

  @Get()
  getMyOrganisations(@Session() session: UserSession) {
    // No guard needed - just requires authentication (via @Session())
    return this.userInOrgService.getUserOrganisations(session.user.id);
  }

  @Post('switch')
  async switchOrganisation(
    @Session() session: UserSession,
    @Body() body: SwitchOrganisationDto,
    @Req() req: Request,
  ) {

    const newOrgId = await this.userInOrgService.switchOrganisation(
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
    return this.userInOrgService.removeUser(orgId, body.userId);
  }

  @Post('changeRole')
  @UseGuards(OrgMemberGuard, RoleGuard)
  @RequiredRole('owner')
  async changeRole(@CurrentOrg() orgId: string, @Body() body: ChangeRoleDto) {
    return this.userInOrgService.changeRole(orgId, body.userId, body.role);
  }
}

