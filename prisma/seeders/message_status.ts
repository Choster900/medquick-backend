import { PrismaClient } from '@prisma/client';

export async function seedMessageStatuses(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'message_status';`);
    await prisma.message_status.createMany({
        data: [
            {
                message_status_id: 1,
                message_status_description: 'Enviado',
                message_status_created_at: now,
                message_status_updated_at: now,
            },
            {
                message_status_id: 2,
                message_status_description: 'Entregado',
                message_status_created_at: now,
                message_status_updated_at: now,
            },
            {
                message_status_id: 3,
                message_status_description: 'Leído',
                message_status_created_at: now,
                message_status_updated_at: now,
            },
            {
                message_status_id: 4,
                message_status_description: 'Error',
                message_status_created_at: now,
                message_status_updated_at: now,
            },
        ],
    });
}
