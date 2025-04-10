import { PrismaClient } from '@prisma/client';

export async function seedAdministrationRoutes(prisma: PrismaClient, now: Date) {

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'administration_route';`);

    await prisma.administration_route.createMany({
        data: [
            {
                administration_route_name: 'Oral',
                administration_route_description: 'Medication taken by mouth',
                administration_route_status: true,
                administration_route_created_at: now,
                administration_route_updated_at: now,
            },
            {
                administration_route_name: 'Intravenous',
                administration_route_description: 'Medication delivered directly into the bloodstream',
                administration_route_status: true,
                administration_route_created_at: now,
                administration_route_updated_at: now,
            },
            {
                administration_route_name: 'Topical',
                administration_route_description: 'Medication applied to the skin',
                administration_route_status: true,
                administration_route_created_at: now,
                administration_route_updated_at: now,
            },
            {
                administration_route_name: 'Inhalation',
                administration_route_description: 'Medication inhaled into the lungs',
                administration_route_status: true,
                administration_route_created_at: now,
                administration_route_updated_at: now,
            },
        ],
    })
}
