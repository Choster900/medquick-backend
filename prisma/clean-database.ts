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
    await prisma.specialty.deleteMany()

}
