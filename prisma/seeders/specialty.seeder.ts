import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSpecialities(prisma: PrismaClient) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'specialty';`);
    const specialties = [
        {
            specialty_name: 'Cardiology',
            specialt_description: 'Heart and blood vessel disorders',
            specialt_status: true,
        },
        {
            specialty_name: 'Dermatology',
            specialt_description: 'Skin-related issues',
            specialt_status: true,
        },
        {
            specialty_name: 'Pediatrics',
            specialt_description: 'Medical care for infants and children',
            specialt_status: true,
        },
        {
            specialty_name: 'Orthopedics',
            specialt_description: 'Musculoskeletal system disorders',
            specialt_status: true,
        },
        {
            specialty_name: 'Neurology',
            specialt_description: 'Nervous system disorders',
            specialt_status: true,
        },
        // Agrega más especialidades según sea necesario
    ];

    for (const specialty of specialties) {
        await prisma.specialty.create({
            data: specialty,
        });
    }
}

