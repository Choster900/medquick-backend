import { PrismaClient } from "@prisma/client";

export async function cleanDatabase(prisma: PrismaClient) {
    // Relaciones que probablemente dependen de otras entidades
    await prisma.procedure_required_exam.deleteMany(); // Depende de medical_procedure y exam
    await prisma.branches_specialty.deleteMany();      // Depende de branch y specialty
    await prisma.medical_appointment.deleteMany();     // Depende de branch, user, etc.
    await prisma.message.deleteMany();                 // Depende de chat y usuario
    await prisma.chat.deleteMany();

    // Entidades independientes o más arriba en la jerarquía
    await prisma.user.deleteMany();
    await prisma.auth_user_profile.deleteMany();
    await prisma.security_profile.deleteMany();
    await prisma.security_permission.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.medical_procedure.deleteMany();
    await prisma.specialty.deleteMany();

    await prisma.branch.deleteMany();             // Ahora sí puede eliminarse
    await prisma.institution.deleteMany();        // Si branch depende de institution
    await prisma.user_state.deleteMany();
    await prisma.medical_appointment_state.deleteMany();
    await prisma.administration_route.deleteMany();
    await prisma.file_type.deleteMany();
    await prisma.relationship_type.deleteMany();
    await prisma.message_status.deleteMany();
}
