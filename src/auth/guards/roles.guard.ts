import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { ROLES_KEY } from './../../common/decorators/roles.decorator';

const prisma = new PrismaClient();

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // No se requiere ningún rol
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        // Obtener los perfiles del usuario con nombre
        const userProfiles = await prisma.auth_user_profile.findMany({
            where: { user_id: user.user_id },
            select: {
                security_profile: {
                    select: {
                        security_profile_profile_name: true,
                    },
                },
            },
        });

        const userRoles = userProfiles.map(p => p.security_profile.security_profile_profile_name);

        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            throw new UnauthorizedException('No tiene los permisos necesarios');
        }

        // Opcional: guardar los roles en el objeto user
        request.user.roles = userRoles;

        return true;
    }
}
