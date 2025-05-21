import { PrismaClient } from "@prisma/client";

export async function seedBranches(prisma: PrismaClient, now: Date) {
    const minsInstitution = await prisma.institution.findFirst({ where: { institution_acronym: 'MINSAL' } });
    const isssInstitution = await prisma.institution.findFirst({ where: { institution_acronym: 'ISSS' } });

    await prisma.branch.createMany({
        data: [
            {
                branch_name: 'Clínica Central San Salvador',
                branch_acronym: 'CCSS',
                branch_description: 'Atención primaria y especializada',
                branch_full_address: 'Avenida Médica #101, San Salvador',
                institution_id: minsInstitution!.institution_id,
                branch_created_at: now,
                branch_updated_at: now,
            },
            {
                branch_name: 'Centro de Salud La Libertad',
                branch_acronym: 'CSLL',
                branch_description: 'Consultas generales y emergencias',
                branch_full_address: 'Calle Libertad, frente al parque central, La Libertad',
                institution_id: minsInstitution!.institution_id,
                branch_created_at: now,
                branch_updated_at: now,
            },
            {
                branch_name: 'Clínica ISSS San Miguel',
                branch_acronym: 'CISSM',
                branch_description: 'Servicios para asegurados',
                branch_full_address: 'Avenida Roosevelt, San Miguel',
                institution_id: isssInstitution!.institution_id,
                branch_created_at: now,
                branch_updated_at: now,
            }
        ],
    });
}
