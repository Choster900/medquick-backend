import { PrismaClient } from '@prisma/client';

export async function seedMedicalAppointmentStates(prisma: PrismaClient, now: Date) {

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'medical_appointment_state';`);

    await prisma.medical_appointment_state.createMany({
        data: [
            { medical_appointment_state_description: 'Created', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'Scheduled', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'Completed', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'Cancelled', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'Rescheduled', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'Pending', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'No Show', medical_appointment_state_created_at: now },
            { medical_appointment_state_description: 'In Progress', medical_appointment_state_created_at: now }
        ]
    })
}
