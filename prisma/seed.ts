import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    // Elimina todos los registros (importante: respetar el orden por relaciones)
    await prisma.user.deleteMany();
    await prisma.user_state.deleteMany();
    await prisma.institution.deleteMany(); // Elimina todas las instituciones
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'user_state';`);
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'institution';`);

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

    // Crea instituciones de ejemplo
    await prisma.institution.createMany({
        data: [
            {
                institution_name: 'Ministerio de Salud',
                institution_acronym: 'MINSAl',  // Acrónimo
                institution_description: 'Institución gubernamental encargada de la salud pública y servicios médicos nacionales.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Hospital General de El Salvador',
                institution_acronym: 'HGES',  // Acrónimo
                institution_description: 'Centro hospitalario especializado en atención médica de emergencia y servicios generales de salud.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Instituto Salvadoreño del Seguro Social',
                institution_acronym: 'ISSS',  // Acrónimo
                institution_description: 'Institución dedicada a la atención médica, prestaciones y servicios a los afiliados al seguro social.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Escuela de Medicina de la Universidad de El Salvador',
                institution_acronym: 'UMES',  // Acrónimo
                institution_description: 'Facultad académica dedicada a la formación de profesionales médicos en El Salvador.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Clinica Oftalmológica San Salvador',
                institution_acronym: 'COSSAL',  // Acrónimo
                institution_description: 'Clínica especializada en el diagnóstico y tratamiento de enfermedades oculares.',
                institution_created_at: now,
                institution_updated_at: now,
            },
        ],
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
