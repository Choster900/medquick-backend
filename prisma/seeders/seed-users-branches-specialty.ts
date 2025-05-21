import { PrismaClient } from '@prisma/client';

export async function seedUsersBranchesSpecialty(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'users_branches_specialty';`);

    // Doctores del sistema
    const doctorEmails = [
        'dr.gomez@example.com',
        'dra.rodriguez@example.com',
        'dr.martinez@example.com',
    ];

    for (const email of doctorEmails) {
        const user = await prisma.user.findUnique({
            where: { user_email: email },
        });

        if (!user) {
            console.warn(`⚠️ Usuario doctor con email ${email} no encontrado. Saltando...`);
            continue;
        }

        // Asignar especialidades aleatorias (puedes cambiar a una lógica más precisa si lo deseas)
        const specialtyIds = [
            Math.floor(Math.random() * 5) + 1, // 1 al 5
            Math.floor(Math.random() * 5) + 1,
        ];

        // Evitar especialidades duplicadas
        const uniqueSpecialties = [...new Set(specialtyIds)];

        for (const specialtyId of uniqueSpecialties) {
            await prisma.users_branches_specialty.create({
                data: {
                    user_id: user.user_id,
                    specialty_id: specialtyId,
                    users_branches_specialty_created_at: now,
                    users_branches_specialty_update_at: now,
                },
            });

            console.log(`✅ Especialidad ${specialtyId} asignada a ${email}`);
        }
    }
}
