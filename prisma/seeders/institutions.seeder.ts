import { PrismaClient } from '@prisma/client';

export async function seedInstitutions(prisma: PrismaClient, now: Date) {
    await prisma.institution.createMany({
        data: [
            {
                institution_name: 'Ministerio de Salud',
                institution_acronym: 'MINSAL',
                institution_description: 'Institución gubernamental encargada de la salud pública en El Salvador.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Instituto Salvadoreño del Seguro Social',
                institution_acronym: 'ISSS',
                institution_description: 'Entidad encargada de brindar atención médica y servicios de seguridad social a trabajadores y sus familias.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Hospital Nacional Rosales',
                institution_acronym: 'HNR',
                institution_description: 'Hospital nacional de referencia especializado en atención médica de alta complejidad.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Hospital Nacional de la Mujer',
                institution_acronym: 'HNM',
                institution_description: 'Centro especializado en salud materno-infantil y ginecológica.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Hospital Bloom',
                institution_acronym: 'HNB',
                institution_description: 'Hospital Nacional Benjamín Bloom, especializado en atención pediátrica.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Escuela de Medicina de la Universidad de El Salvador',
                institution_acronym: 'EMUES',
                institution_description: 'Institución académica encargada de la formación médica universitaria en El Salvador.',
                institution_created_at: now,
                institution_updated_at: now,
            },
            {
                institution_name: 'Hospital Nacional San Rafael',
                institution_acronym: 'HNSR',
                institution_description: 'Hospital general que ofrece servicios médicos a la población del área metropolitana de San Salvador.',
                institution_created_at: now,
                institution_updated_at: now,
            },
        ],
    });
}
