import { PrismaClient } from '@prisma/client';

export async function seedAuthUserProfile(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'auth_user_profile';`);

    const userProfiles = [
        // Admin
        { email: 'admin@example.com', profileId: 1 },
        // Admin médico
        { email: 'medical.admin@example.com', profileId: 2 },
        // Doctores
        { email: 'dr.gomez@example.com', profileId: 3 },
        { email: 'dra.rodriguez@example.com', profileId: 3 },
        { email: 'dr.martinez@example.com', profileId: 3 },
        // Pacientes
        { email: 'ana.perez@example.com', profileId: 4 },
        { email: 'luis.hernandez@example.com', profileId: 4 },
        { email: 'sofia.ramirez@example.com', profileId: 4 },
        { email: 'jorge.castro@example.com', profileId: 4 },
        { email: 'carmen.flores@example.com', profileId: 4 },
        // Enfermería
       /*  { email: 'enfermera.reyes@example.com', profileId: 5 },
        { email: 'enfermero.gutierrez@example.com', profileId: 5 }, */
    ];

    for (const { email, profileId } of userProfiles) {
        const user = await prisma.user.findUnique({
            where: { user_email: email },
        });

        if (!user) {
            console.warn(`⚠️ Usuario con email ${email} no encontrado. Saltando...`);
            continue;
        }

        await prisma.auth_user_profile.create({
            data: {
                user_id: user.user_id,
                security_profile_id: profileId,
                auth_user_profile_created_at: now,
                auth_user_profile_modified_at: now,
            },
        });

        console.log(`✅ Perfil asignado al usuario ${email}`);
    }
}
