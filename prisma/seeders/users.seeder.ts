import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
    const activo = await prisma.user_state.findFirst({
        where: { user_state_name: 'Activo' },
    });

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
        },
    });
}
