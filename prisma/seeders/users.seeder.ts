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
        {
            gender: 'MALE',
            firstName: 'Doctor',
            secondName: 'Medical',
            firstLastname: 'Medical',
            secondLastname: 'Doctor',
            email: 'doctor.medical@example.com',
            password: 'DoctorMedicalPassword123',
            dui: '22233344-5',
            birthdate: '1982-06-12',
            phone: '6666-7777',
            address: 'Doctor Medical Address',
        },
        {
            gender: 'FEMALE',
            firstName: 'Patient',
            secondName: 'One',
            firstLastname: 'One',
            secondLastname: 'Patient',
            email: 'patient.one@example.com',
            password: 'PatientOnePassword123',
            dui: '33344455-6',
            birthdate: '1990-09-15',
            phone: '7777-8888',
            address: 'Patient One Address',
        },
        {
            gender: 'MALE',
            firstName: 'Patient',
            secondName: 'Two',
            firstLastname: 'Two',
            secondLastname: 'Patient',
            email: 'patient.two@example.com',
            password: 'PatientTwoPassword123',
            dui: '44455566-7',
            birthdate: '1992-11-20',
            phone: '8888-9999',
            address: 'Patient Two Address',
        },
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
}
