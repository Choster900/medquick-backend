import { Gender, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
    const activo = await prisma.user_state.findFirst({
        where: { user_state_name: 'Activo' },
    });

    if (!activo) {
        throw new Error('❌ Estado de usuario "Activo" no encontrado. Asegúrate de ejecutar seedUserStates primero.');
    }

    const users = [
        // Usuarios administrativos
        {
            gender: 'MALE',
            firstName: 'Admin',
            secondName: 'User',
            firstLastname: 'Admin',
            secondLastname: 'User',
            email: 'admin@example.com',
            password: 'AdminPassword123',
            dui: '98765432-1',
            birthdate: '1980-01-01',
            phone: '9999-8888',
            address: 'Admin Address',
        },
        {
            gender: 'FEMALE',
            firstName: 'Medical',
            secondName: 'Admin',
            firstLastname: 'Medical',
            secondLastname: 'Admin',
            email: 'medical.admin@example.com',
            password: 'MedicalAdminPassword123',
            dui: '11122233-4',
            birthdate: '1985-03-20',
            phone: '5555-6666',
            address: 'Medical Admin Address',
        },

        // Doctores
        {
            gender: 'MALE',
            firstName: 'Carlos',
            secondName: 'Enrique',
            firstLastname: 'Gómez',
            secondLastname: 'López',
            email: 'dr.gomez@example.com',
            password: 'DrGomezPassword123',
            dui: '22233344-5',
            birthdate: '1982-06-12',
            phone: '6666-7777',
            address: 'Calle Médica 123, San Salvador',
        },
        {
            gender: 'FEMALE',
            firstName: 'María',
            secondName: 'Fernanda',
            firstLastname: 'Rodríguez',
            secondLastname: 'Vásquez',
            email: 'dra.rodriguez@example.com',
            password: 'DraRodriguezPassword123',
            dui: '33344455-6',
            birthdate: '1988-09-25',
            phone: '7777-8888',
            address: 'Avenida Salud 456, Santa Tecla',
        },
        {
            gender: 'MALE',
            firstName: 'Roberto',
            secondName: 'Antonio',
            firstLastname: 'Martínez',
            secondLastname: 'Hernández',
            email: 'dr.martinez@example.com',
            password: 'DrMartinezPassword123',
            dui: '44455566-7',
            birthdate: '1975-11-30',
            phone: '8888-9999',
            address: 'Boulevard Hospital 789, Soyapango',
        },

        // Pacientes
        {
            gender: 'FEMALE',
            firstName: 'Ana',
            secondName: 'Isabel',
            firstLastname: 'Pérez',
            secondLastname: 'García',
            email: 'ana.perez@example.com',
            password: 'AnaPerezPassword123',
            dui: '55566677-8',
            birthdate: '1990-09-15',
            phone: '1111-2222',
            address: 'Colonia Médica 321, San Salvador',
        },
        {
            gender: 'MALE',
            firstName: 'Luis',
            secondName: 'Alberto',
            firstLastname: 'Hernández',
            secondLastname: 'Díaz',
            email: 'luis.hernandez@example.com',
            password: 'LuisHernandezPassword123',
            dui: '66677788-9',
            birthdate: '1992-11-20',
            phone: '2222-3333',
            address: 'Residencial Salud 654, Antiguo Cuscatlán',
        },
        {
            gender: 'FEMALE',
            firstName: 'Sofía',
            secondName: 'Margarita',
            firstLastname: 'Ramírez',
            secondLastname: 'Morales',
            email: 'sofia.ramirez@example.com',
            password: 'SofiaRamirezPassword123',
            dui: '77788899-0',
            birthdate: '1985-04-18',
            phone: '3333-4444',
            address: 'Callejón Clínica 987, Mejicanos',
        },
        {
            gender: 'MALE',
            firstName: 'Jorge',
            secondName: 'Francisco',
            firstLastname: 'Castro',
            secondLastname: 'Rivas',
            email: 'jorge.castro@example.com',
            password: 'JorgeCastroPassword123',
            dui: '88899900-1',
            birthdate: '1978-07-22',
            phone: '4444-5555',
            address: 'Pasaje Consultorio 654, Apopa',
        },
        {
            gender: 'FEMALE',
            firstName: 'Carmen',
            secondName: 'Rosa',
            firstLastname: 'Flores',
            secondLastname: 'Ortiz',
            email: 'carmen.flores@example.com',
            password: 'CarmenFloresPassword123',
            dui: '99900011-2',
            birthdate: '1965-12-05',
            phone: '5555-6666',
            address: 'Avenida Paciente 321, Ilopango',
        },

        // Personal de enfermería
        {
            gender: 'FEMALE',
            firstName: 'Patricia',
            secondName: 'Elizabeth',
            firstLastname: 'Reyes',
            secondLastname: 'Sánchez',
            email: 'enfermera.reyes@example.com',
            password: 'EnfermeraReyesPassword123',
            dui: '12345678-9',
            birthdate: '1987-03-15',
            phone: '6666-7777',
            address: 'Colonia Enfermería 135, San Marcos',
        },
        {
            gender: 'MALE',
            firstName: 'Mario',
            secondName: 'José',
            firstLastname: 'Gutiérrez',
            secondLastname: 'Portillo',
            email: 'enfermero.gutierrez@example.com',
            password: 'EnfermeroGutierrezPassword123',
            dui: '23456789-0',
            birthdate: '1990-08-20',
            phone: '7777-8888',
            address: 'Calle Enfermero 246, Ayutuxtepeque',
        }
    ];

    await Promise.all(
        users.map(async (u) => {
            const hashedPassword = await bcrypt.hash(u.password, 10);
            await prisma.user.create({
                data: {
                    user_state_id: activo.user_state_id,
                    user_gender: u.gender as Gender,
                    user_first_name: u.firstName,
                    user_second_name: u.secondName,
                    user_third_name: '',
                    user_first_lastname: u.firstLastname,
                    user_second_lastname: u.secondLastname,
                    user_third_lastname: '',
                    user_email: u.email,
                    user_password: hashedPassword,
                    user_dui: u.dui,
                    user_birthdate: new Date(u.birthdate),
                    user_phone_number: u.phone,
                    user_address: u.address,
                },
            });
        })
    );

    console.log('✅ Usuarios creados correctamente');
}
