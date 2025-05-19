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
import { seedAuthUserProfile } from './seeders/auth-user-profile.seede';
import { seedExams } from './seeders/exam';
import { seedMessageStatuses } from './seeders/message_status';
import { seedChats } from './seeders/init-chat.seeder';
import { seedMedicalProcedures } from './seeders/medical-procedures.seed';
import { seedUsersBranchesSpecialty } from './seeders/seed-users-branches-specialty';

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
    await seedExams(prisma, now);
    await seedMessageStatuses(prisma, now);

    // === Entidades principales ===
    await seedInstitutions(prisma, now);
    await seedBranches(prisma, now);
    await seedUsers(prisma);
    await seedChats(prisma, now);
    await seedSpecialities(prisma)
    await seedUsersBranchesSpecialty(prisma, now)
    await seedMedicalProcedures(prisma, now);

    // === Seguridad ===
    await seedSecurityPermissions(prisma);
    await seedSecurityProfiles(prisma);
    await seedSecurityPermisoProfiles(prisma);
    await seedAuthUserProfile(prisma, now);

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
