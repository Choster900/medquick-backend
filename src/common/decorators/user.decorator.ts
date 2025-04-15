// src/common/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CurrentUser } from '../interfaces/current-user.interface';
import { buildErrorResponse } from '../helpers';

export const User = createParamDecorator(
    (data: keyof CurrentUser | undefined, ctx: ExecutionContext): any => {
        const request = ctx.switchToHttp().getRequest();

        if (!request.user) {
            throw new UnauthorizedException(
                buildErrorResponse(
                    'No se ha proporcionado un token válido',
                    401,
                    'El usuario no existe o el token es inválido',
                )
            );
        }

        const user = request.user;
        return data ? user?.[data] : user;
    },
);
