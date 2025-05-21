import { PrismaClient } from "@prisma/client";

export async function cleanDatabase(prisma: PrismaClient) {
    await prisma.medical_appointment.deleteMany();
    await prisma.user_state.deleteMany();
    await prisma.branch.deleteMany();
    await prisma.institution.deleteMany();
    await prisma.user.deleteMany();
    await prisma.medical_appointment_state.deleteMany();
    await prisma.administration_route.deleteMany();
    await prisma.file_type.deleteMany();
    await prisma.relationship_type.deleteMany();
    await prisma.auth_user_profile.deleteMany();
    await prisma.security_profile.deleteMany();
    await prisma.security_permission.deleteMany();
    await prisma.security_profile.deleteMany();
    await prisma.procedure_required_exam.deleteMany()
    await prisma.medical_procedure.deleteMany()
    await prisma.specialty.deleteMany()
    await prisma.exam.deleteMany()
    await prisma.message.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.message_status.deleteMany()
}
