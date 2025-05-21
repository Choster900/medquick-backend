import { PrismaClient } from '@prisma/client';

export async function seedMedicalProcedures(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'medical_procedure';`);

    // Obtener todas las sucursales existentes
    const branches = await prisma.branch.findMany();

    if (branches.length === 0) {
        throw new Error('No se encontraron sucursales. Ejecuta primero el seeder de sucursales.');
    }

    // Crear procedimientos médicos de ejemplo
    await prisma.medical_procedure.createMany({
        data: [
            {
                specialty_id: 1,
                branch_id: branches[0].branch_id, // Usar la primera sucursal
                medical_procedure_name: 'Cita general',
                medical_procedure_photo_url: 'https://example.com/procedures/apendicectomia.jpg',
                medical_procedure_estimated_duration: '90',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 0,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 2,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },
            // Procedimientos de Cirugía General
            {
                specialty_id: 1,
                branch_id: branches[0].branch_id,
                medical_procedure_name: 'Apendicectomía',
                medical_procedure_photo_url: 'https://example.com/procedures/apendicectomia.jpg',
                medical_procedure_estimated_duration: '90',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 2500.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 2,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },
            {
                specialty_id: 1,
                branch_id: branches[1].branch_id, // Usar la segunda sucursal
                medical_procedure_name: 'Operación de hernia inguinal',
                medical_procedure_photo_url: 'https://example.com/procedures/hernia.jpg',
                medical_procedure_estimated_duration: '120',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 3000.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 3,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },

            // Procedimientos de Ortopedia
            {
                specialty_id: 2,
                branch_id: branches[1].branch_id,
                medical_procedure_name: 'Operación de pie plano',
                medical_procedure_photo_url: 'https://example.com/procedures/pie_plano.jpg',
                medical_procedure_estimated_duration: '180',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 4000.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 1,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },
            {
                specialty_id: 2,
                branch_id: branches[2].branch_id, // Usar la tercera sucursal
                medical_procedure_name: 'Artroscopia de rodilla',
                medical_procedure_photo_url: 'https://example.com/procedures/artroscopia.jpg',
                medical_procedure_estimated_duration: '150',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 3500.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 2,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },

            // Procedimientos de Oftalmología
            {
                specialty_id: 3,
                branch_id: branches[2].branch_id,
                medical_procedure_name: 'Cirugía de cataratas',
                medical_procedure_photo_url: 'https://example.com/procedures/cataratas.jpg',
                medical_procedure_estimated_duration: '60',
                medical_procedure_requires_confirmation: true,
                medical_procedure_cost: 2800.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 4,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },
            {
                specialty_id: 3,
                branch_id: branches[0].branch_id,
                medical_procedure_name: 'Examen de optometría completo',
                medical_procedure_photo_url: 'https://example.com/procedures/optometria.jpg',
                medical_procedure_estimated_duration: '45',
                medical_procedure_requires_confirmation: false,
                medical_procedure_cost: 80.00,
                medical_procedure_available_online: true,
                medical_procedure_available_slots: 8,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },

            // Procedimientos de Cardiología
            {
                specialty_id: 4,
                branch_id: branches[1].branch_id,
                medical_procedure_name: 'Ecocardiograma',
                medical_procedure_photo_url: 'https://example.com/procedures/ecocardiograma.jpg',
                medical_procedure_estimated_duration: '30',
                medical_procedure_requires_confirmation: false,
                medical_procedure_cost: 150.00,
                medical_procedure_available_online: false,
                medical_procedure_available_slots: 6,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            },
            {
                specialty_id: 4,
                branch_id: branches[2].branch_id,
                medical_procedure_name: 'Consulta cardiológica',
                medical_procedure_photo_url: 'https://example.com/procedures/consulta.jpg',
                medical_procedure_estimated_duration: '40',
                medical_procedure_requires_confirmation: false,
                medical_procedure_cost: 120.00,
                medical_procedure_available_online: true,
                medical_procedure_available_slots: 10,
                medical_procedure_is_active: true,
                medical_procedure_created_at: now,
                medical_procedure_update_at: now
            }
        ],
    });

    console.log('✅ Procedimientos médicos creados correctamente');
}
