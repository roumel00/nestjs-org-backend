import { Controller, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { DeleteUserService } from './deleteUser.service.js';
import { DeleteUserRequest } from './deleteUser.dto.js';
import { DevelopmentGuard } from '@common/guards/development.guard.js';

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete('delete')
  @UseGuards(DevelopmentGuard)
  async delete(@Req() req: Request, @Session() session: UserSession, @Body() body: DeleteUserRequest) {
    return this.deleteUserService.deleteUser(req, session, body.password);
  }
}
