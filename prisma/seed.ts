import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Elimina todos los registros (orden importa si hay relaciones)
    await prisma.user.deleteMany();
    await prisma.user_state.deleteMany();

    // Crea estados de usuario
    const activo = await prisma.user_state.create({
        data: {
            user_state_name: 'Activo',
            user_state_description: 'Usuario activo en el sistema',
            user_state_created_at: new Date().toISOString(),
            user_state_updated_at: new Date().toISOString(),
        },
    });

    // Crea un usuario
    await prisma.user.create({
        data: {
            user_state_id: activo.user_state_id,
            user_gender: 'MALE',
            user_first_name: 'Juan',
            user_second_name: 'Carlos',
            user_third_name: 'Pedro',
            user_first_lastname: 'Pérez',
            user_second_lastname: 'López',
            user_third_lastname: 'Gómez',
            user_email: 'juan.carlos@example.com',
            user_password: 'Password123',
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
