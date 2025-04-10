import { PrismaClient } from '@prisma/client';

export async function seedSecurityProfiles(prisma: PrismaClient) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'security_profile';`);

    await prisma.security_profile.createMany({
        data: [
            {
                security_profile_profile_name: 'SUPER_ADMIN',
                security_profile_profile_description: 'Super Admin Profile',
            },
            {
                security_profile_profile_name: 'ADMIN',
                security_profile_profile_description: 'Admin Profile',
            },
            {
                security_profile_profile_name: 'DOCTOR',
                security_profile_profile_description: 'Doctor Profile',
            },
            {
                security_profile_profile_name: 'PACIENTE',
                security_profile_profile_description: 'Paciente Profile',
            },
        ],
    });
}

export async function seedSecurityPermissions(prisma: PrismaClient) {
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'security_permission';`);
    await prisma.security_permission.createMany({
        data: [
            {
                security_permission_permission_name: 'ADD',
                security_permission_permission_code: 'ADD',
            },
            {
                security_permission_permission_name: 'EDIT',
                security_permission_permission_code: 'EDIT',
            },
            {
                security_permission_permission_name: 'DELETE',
                security_permission_permission_code: 'DELETE',
            },
        ],
    });
}

export async function seedSecurityPermisoProfiles(prisma: PrismaClient) {
    const superAdminProfile = await prisma.security_profile.findFirst({
        where: { security_profile_profile_name: 'SUPER_ADMIN' },
    });

    const adminProfile = await prisma.security_profile.findFirst({
        where: { security_profile_profile_name: 'ADMIN' },
    });

    const doctorProfile = await prisma.security_profile.findFirst({
        where: { security_profile_profile_name: 'DOCTOR' },
    });

    const pacienteProfile = await prisma.security_profile.findFirst({
        where: { security_profile_profile_name: 'PACIENTE' },
    });

    const addPermission = await prisma.security_permission.findFirst({
        where: { security_permission_permission_name: 'ADD' },
    });

    const editPermission = await prisma.security_permission.findFirst({
        where: { security_permission_permission_name: 'EDIT' },
    });

    const deletePermission = await prisma.security_permission.findFirst({
        where: { security_permission_permission_name: 'DELETE' },
    });

    // Check if the permissions and profiles were found
    if (!addPermission || !superAdminProfile) {
        console.error('Required permissions or profiles not found. Exiting seed process.');
        return;
    }

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name = 'security_permiso_profile';`);

    await prisma.security_permiso_profile.createMany({
        data: [
            {
                security_permission_id: addPermission.security_permission_id,
                security_profile_id: superAdminProfile.security_profile_id,
            },
            {
                security_permission_id: editPermission?.security_permission_id as number,
                security_profile_id: superAdminProfile?.security_profile_id as number,
            },
            {
                security_permission_id: deletePermission?.security_permission_id as number,
                security_profile_id: superAdminProfile?.security_profile_id as number,
            },
            {
                security_permission_id: addPermission?.security_permission_id as number,
                security_profile_id: adminProfile?.security_profile_id as number,
            },
            {
                security_permission_id: editPermission?.security_permission_id as number,
                security_profile_id: adminProfile?.security_profile_id as number,
            },
            {
                security_permission_id: deletePermission?.security_permission_id as number,
                security_profile_id: adminProfile?.security_profile_id as number,
            },
            {
                security_permission_id: addPermission?.security_permission_id as number,
                security_profile_id: doctorProfile?.security_profile_id as number,
            },
            {
                security_permission_id: editPermission?.security_permission_id as number,
                security_profile_id: doctorProfile?.security_profile_id as number,
            },
            {
                security_permission_id: deletePermission?.security_permission_id as number,
                security_profile_id: doctorProfile?.security_profile_id as number,
            },
            {
                security_permission_id: addPermission?.security_permission_id as number,
                security_profile_id: pacienteProfile?.security_profile_id as number,
            },
            {
                security_permission_id: editPermission?.security_permission_id as number,
                security_profile_id: pacienteProfile?.security_profile_id as number,
            },
            {
                security_permission_id: deletePermission?.security_permission_id as number,
                security_profile_id: pacienteProfile?.security_profile_id as number,
            },
        ],
    });
}

