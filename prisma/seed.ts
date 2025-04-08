import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Elimina todos los registros (importante: respetar el orden por relaciones)
    await prisma.user.deleteMany();
    await prisma.user_state.deleteMany();
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'user_state';`);

    // Fecha actual formateada
    const now = new Date();

    // Crea varios estados
    const userStates = await prisma.user_state.createMany({
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

    // Obtener el estado "Activo"
    const activo = await prisma.user_state.findFirst({
        where: { user_state_name: 'Activo' }
    });

    // Crea un usuario de ejemplo
    await prisma.user.create({
        data: {
            user_state_id: activo?.user_state_id,
            user_gender: 'MALE',
            user_first_name: 'Juan',
            user_second_name: 'Carlos',
            user_third_name: 'Pedro',
            user_first_lastname: 'Pérez',
            user_second_lastname: 'López',
            user_third_lastname: 'Gómez',
            user_email: 'juan.carlos@example.com',
            user_password: bcrypt.hashSync('Password123', 10),
            user_dui: '12345678-9',
            user_birthdate: new Date('1990-05-15'),
            user_phone_number: '7777-8888',
            user_address: 'San Salvador',
        }
    });

    console.log('✨ Seed ejecutado correctamente!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
