import { PrismaClient } from '@prisma/client';

export async function seedBranchesSpecialty(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'branches_specialty';`);

    // Sucursales a buscar por nombre
    const branchNames = [
        'Clínica Central San Salvador',
        'Centro de Salud La Libertad',
        'Clínica ISSS San Miguel'
    ];

    for (const name of branchNames) {
        const branch = await prisma.branch.findFirst({
            where: { branch_name: name }
        });

        if (!branch) {
            console.warn(`⚠️ No se encontró la sucursal con nombre: ${name}`);
            continue;
        }

        // Asignar especialidades aleatorias (1 al 5)
        const specialtyIds = [
            Math.floor(Math.random() * 5) + 1,
            Math.floor(Math.random() * 5) + 1,
        ];

        // Evitar especialidades duplicadas
        const uniqueSpecialties = [...new Set(specialtyIds)];

        for (const specialtyId of uniqueSpecialties) {
            await prisma.branches_specialty.create({
                data: {
                    specialty_id: specialtyId,
                    branch_id: branch.branch_id,
                    branches_specialty_created_at: now,
                },
            });

            console.log(`✅ Especialidad ${specialtyId} asignada a la sucursal "${branch.branch_name}"`);
        }
    }
}
