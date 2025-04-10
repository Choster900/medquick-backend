import { PrismaClient } from '@prisma/client';
import { seedUserStates } from './seeders/user-states.seeder';
import { seedUsers } from './seeders/users.seeder';
import { seedInstitutions } from './seeders/institutions.seeder';
import { seedBranches } from './seeders/branches.seeder';
import { seedMedicalAppointmentStates } from './seeders/medical_appointment_state';
import { seedAdministrationRoutes } from './seeders/administration_route';
import { seedFileTypes } from './seeders/file_type';
import { seedRelationshipTypes } from './seeders/relationship_type';

const prisma = new PrismaClient();

async function main() {
    await prisma.medical_appointment.deleteMany();
    await prisma.user_state.deleteMany();
    await prisma.branch.deleteMany();
    await prisma.institution.deleteMany();
    await prisma.user.deleteMany();
    await prisma.medical_appointment_state.deleteMany();
    await prisma.administration_route.deleteMany();
    await prisma.file_type.deleteMany();
    await prisma.relationship_type.deleteMany();


    const now = new Date();

    await seedUserStates(prisma, now);
    await seedUsers(prisma);
    await seedInstitutions(prisma, now);
    await seedBranches(prisma, now);
    await seedMedicalAppointmentStates(prisma, now);
    await seedAdministrationRoutes(prisma, now);
    await seedFileTypes(prisma, now);
    await seedRelationshipTypes(prisma, now);

    console.log('✅ Seed ejecutado correctamente.');

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
