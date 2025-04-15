import { PrismaClient } from "@prisma/client";


export async function seedFileTypes(prisma: PrismaClient, now: Date) {

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'file_type';`);


    await prisma.file_type.createMany({
        data: [
            {
                file_type_name: 'PDF',
                file_type_mime_type: 'application/pdf',
                file_type_extension: '.pdf',
                file_type_created_at: now,
                file_type_updated_at: now,
            },
            {
                file_type_name: 'JPEG',
                file_type_mime_type: 'image/jpeg',
                file_type_extension: '.jpeg',
                file_type_created_at: now,
                file_type_updated_at: now,
            },
            {
                file_type_name: 'PNG',
                file_type_mime_type: 'image/png',
                file_type_extension: '.png',
                file_type_created_at: now,
                file_type_updated_at: now,
            },
            {
                file_type_name: 'DOCX',
                file_type_mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                file_type_extension: '.docx',
                file_type_created_at: now,
                file_type_updated_at: now,
            },
            {
                file_type_name: 'PDF',
                file_type_mime_type: 'application/pdf',
                file_type_extension: '.pdf',
                file_type_created_at: now,
                file_type_updated_at: now,
            },
            
        ],
    });
}
