import { PrismaClient } from '@prisma/client';
import { seedUserStates } from './seeders/user-states.seeder';
import { seedUsers } from './seeders/users.seeder';
import { seedInstitutions } from './seeders/institutions.seeder';
import { seedBranches } from './seeders/branches.seeder';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.user_state.deleteMany();
    await prisma.branch.deleteMany();
    await prisma.institution.deleteMany();

    const now = new Date();

    await seedUserStates(prisma, now);
    await seedUsers(prisma);
    await seedInstitutions(prisma, now);
    await seedBranches(prisma, now);

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
