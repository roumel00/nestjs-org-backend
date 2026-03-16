import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const teamMember = request.teamMember;
    return {
      id: teamMember.userId as string,
      name: teamMember.name as string | null,
    };
  },
);
