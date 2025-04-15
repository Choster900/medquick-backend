import { PrismaClient } from '@prisma/client';

export async function seedPrescriptionItems(prisma: PrismaClient, now: Date) {

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'prescription_item';`);

    await prisma.prescription_item.createMany({
        data: [           {
                administration_route_id: 1,
                prescription_item_medication_name: 'Aspirin',
                prescription_item_dosage: '500mg',
                prescription_item_frequency: 'Once a day',
                prescription_item_duration: '7 days',
                prescription_item_unit: 'tablet',
                prescription_item_item_notes: 'Take with food',
                prescription_item_created_at: now,
                prescription_item_updated_at: now,
            },
            {
                administration_route_id: 2,
                prescription_item_medication_name: 'Amoxicillin',
                prescription_item_dosage: '250mg',
                prescription_item_frequency: 'Three times a day',
                prescription_item_duration: '10 days',
                prescription_item_unit: 'capsule',
                prescription_item_item_notes: 'Finish the entire course',
                prescription_item_created_at: now,
                prescription_item_updated_at: now,
            },
            {
                administration_route_id: 3,
                prescription_item_medication_name: 'Ibuprofen',
                prescription_item_dosage: '200mg',
                prescription_item_frequency: 'Every 4 hours as needed',
                prescription_item_duration: '5 days',
                prescription_item_unit: 'tablet',
                prescription_item_item_notes: 'Do not exceed 1200mg in 24 hours',
                prescription_item_created_at: now,
                prescription_item_updated_at: now,
            },
            {
                prescription_id: 3,
                administration_route_id: 4,
                prescription_item_medication_name: 'Albuterol',
                prescription_item_dosage: '2 puffs',
                prescription_item_frequency: 'Every 4-6 hours as needed',
                prescription_item_duration: 'Until symptoms improve',
                prescription_item_unit: 'inhalation',
                prescription_item_item_notes: 'Shake well before use',
                prescription_item_created_at: now,
                prescription_item_updated_at: now,
            },
            {
                prescription_id: 4,
                administration_route_id: 1,
                prescription_item_medication_name: 'Acetaminophen',
                prescription_item_dosage: '325mg',
                prescription_item_frequency: 'Every 6 hours as needed',
                prescription_item_duration: '3 days',
                prescription_item_unit: 'capsule',
                prescription_item_item_notes: 'Do not exceed 4000mg in 24 hours',
                prescription_item_created_at: now,
                prescription_item_updated_at: now,
            },
            // Agrega más items 
        ],
    })
}
