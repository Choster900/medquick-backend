import { PrismaClient } from '@prisma/client';

export async function seedAuthUserProfile(prisma: PrismaClient, now: Date) {

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'medical_appointment_state';`);

    const userProfiles = [
        { email: 'admin@example.com', profileId: 1 },
        { email: 'medical.admin@example.com', profileId: 2 },
        { email: 'doctor.medical@example.com', profileId: 3 },
        { email: 'patient.one@example.com', profileId: 4 },
        { email: 'patient.two@example.com', profileId: 4 },
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
    }

}
