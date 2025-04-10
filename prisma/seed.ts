import { PrismaClient } from '@prisma/client';
import { cleanDatabase } from './clean-database';
import {
    seedUsers,
    seedBranches,
    seedFileTypes,
    seedUserStates,
    seedInstitutions,
    seedSecurityProfiles,
    seedRelationshipTypes,
    seedSecurityPermissions,
    seedAdministrationRoutes,
    seedSecurityPermisoProfiles,
    seedMedicalAppointmentStates,
    seedSpecialities,
} from './seeders';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase(prisma);

    const now = new Date();

    // === Catálogos base ===
    await seedUserStates(prisma, now);
    await seedMedicalAppointmentStates(prisma, now);
    await seedAdministrationRoutes(prisma, now);
    await seedFileTypes(prisma, now);
    await seedRelationshipTypes(prisma, now);

    // === Entidades principales ===
    await seedInstitutions(prisma, now);
    await seedBranches(prisma, now);
    await seedUsers(prisma);
    await seedSpecialities(prisma)

    // === Seguridad ===
    await seedSecurityPermissions(prisma);
    await seedSecurityProfiles(prisma);
    await seedSecurityPermisoProfiles(prisma);

    console.log('✅ Seed ejecutado correctamente.');
}

main()
    .catch((e) => {
        console.error('❌ Error ejecutando seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
