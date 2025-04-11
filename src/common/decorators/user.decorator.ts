// src/common/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CurrentUser } from '../interfaces/current-user.interface';

export const User = createParamDecorator(
    (data: keyof CurrentUser | undefined, ctx: ExecutionContext): any => {
        const request = ctx.switchToHttp().getRequest();

        if (!request.user) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        const user = request.user;
        return data ? user?.[data] : user;
    },
);
