import { AuthGuard } from '@nestjs/passport';
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { buildErrorResponse } from 'src/common/helpers';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        if (err || !user) {
            const request = context.switchToHttp().getRequest();

            throw new UnauthorizedException(
                buildErrorResponse(
                    'No se ha proporcionado un token válido',
                    401,
                    info?.message || 'Token inválido o expirado',
                    request.url,
                ),
            );
        }

        return user;
    }
}
