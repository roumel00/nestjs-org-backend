import { Controller, Get, Post, Delete, Body, Req } from '@nestjs/common';
import {
  Session,
  AllowAnonymous,
  OptionalAuth,
} from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service.js';
import { DeleteUserDto } from './dto/deleteUser.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Session() session: UserSession) {
    return this.userService.getMe(session);
  }

  @Get('public')
  @AllowAnonymous()
  pub() {
    return this.userService.pub();
  }

  @Get('optional')
  @OptionalAuth()
  optional(@Session() session?: UserSession) {
    return this.userService.optional(session);
  }

  @Delete('delete')
  async delete(@Req() req: Request, @Session() session: UserSession, @Body() body: DeleteUserDto) {
    return this.userService.deleteUser(req, session, body.password);
  }
}
