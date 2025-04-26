import { PrismaClient } from "@prisma/client";

export async function seedExams(prisma: PrismaClient, now: Date) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'exam';`);

    await prisma.exam.createMany({
        data: [
            {
                exam_name: 'Hemograma completo',
                exam_created_at: now,
                exam_update_at: now,
            },
            {
                exam_name: 'Rayos X de tórax',
                exam_created_at: now,
                exam_update_at: now,
            },
            {
                exam_name: 'Prueba de glucosa',
                exam_created_at: now,
                exam_update_at: now,
            },
        ],
    });
}
