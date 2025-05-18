import { PrismaClient } from '@prisma/client';

export async function seedChats(prisma: PrismaClient, now: Date) {
    // Resetear el autoincremental en SQLite (si es necesario)
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'chat';`);

    // Obtener usuarios por sus correos electrónicos
    const admin = await prisma.user.findUnique({
        where: { user_email: 'admin@example.com' }
    });

    const medicalAdmin = await prisma.user.findUnique({
        where: { user_email: 'medical.admin@example.com' }
    });

    const doctor = await prisma.user.findUnique({
        where: { user_email: 'doctor.medical@example.com' }
    });

    const patient1 = await prisma.user.findUnique({
        where: { user_email: 'patient.one@example.com' }
    });

    const patient2 = await prisma.user.findUnique({
        where: { user_email: 'patient.two@example.com' }
    });

    if (!admin || !medicalAdmin || !doctor || !patient1 || !patient2) {
        throw new Error('❌ No se encontraron todos los usuarios necesarios. Asegúrate de ejecutar seedUsers primero.');
    }

    // Crear chats de ejemplo
    await prisma.chat.createMany({
        data: [
            {
                chat_user_id: patient1.user_id,
                chat_doctor_id: doctor.user_id,
                chat_created_at: now,
                chat_updated_at: now
            },
            {
                chat_user_id: patient2.user_id,
                chat_doctor_id: doctor.user_id,
                chat_created_at: new Date(now.getTime() - 86400000), // 1 día antes
                chat_updated_at: new Date(now.getTime() - 86400000)
            },
            {
                chat_user_id: admin.user_id,
                chat_doctor_id: medicalAdmin.user_id,
                chat_created_at: new Date(now.getTime() - 172800000), // 2 días antes
                chat_updated_at: now
            },
            {
                chat_user_id: patient1.user_id,
                chat_doctor_id: medicalAdmin.user_id,
                chat_created_at: new Date(now.getTime() - 259200000), // 3 días antes
                chat_updated_at: new Date(now.getTime() - 86400000) // 1 día antes
            }
        ],
    });

    console.log('✅ Chats creados correctamente');
}
