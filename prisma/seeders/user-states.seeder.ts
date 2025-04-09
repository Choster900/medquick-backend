import { PrismaClient } from '@prisma/client';

export async function seedUserStates(prisma: PrismaClient, now: Date) {
    await prisma.user_state.createMany({
        data: [
            {
                user_state_name: 'Activo',
                user_state_description: 'Usuario activo en el sistema',
                user_state_created_at: now,
                user_state_updated_at: now,
            },
            {
                user_state_name: 'Inactivo',
                user_state_description: 'Usuario que no ha iniciado sesión recientemente',
                user_state_created_at: now,
                user_state_updated_at: now,
            },
            {
                user_state_name: 'Suspendido',
                user_state_description: 'Usuario suspendido por comportamiento inapropiado',
                user_state_created_at: now,
                user_state_updated_at: now,
            },
            {
                user_state_name: 'Pendiente',
                user_state_description: 'Usuario registrado pero pendiente de verificación',
                user_state_created_at: now,
                user_state_updated_at: now,
            },
            {
                user_state_name: 'Verificado',
                user_state_description: 'Usuario con correo verificado',
                user_state_created_at: now,
                user_state_updated_at: now,
            },
        ],
    });
}
