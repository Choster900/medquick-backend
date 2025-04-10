import { PrismaClient } from "@prisma/client";

export async function seedRelationshipTypes(prisma: PrismaClient, now: Date) {
    await prisma.relationship_type.createMany({
        data: [
            {
                relationship_type_description: 'Parent',
                relationship_type_created_at: now,
                relationship_type_updated_at: now,
            },
            {
                relationship_type_description: 'Sibling',
                relationship_type_created_at: now,
                relationship_type_updated_at: now,
            },
            {
                relationship_type_description: 'Spouse',
                relationship_type_created_at: now,
                relationship_type_updated_at: now,
            },
            {
                relationship_type_description: 'Guardian',
                relationship_type_created_at: now,
                relationship_type_updated_at: now,
            },
            {
                relationship_type_description: 'Friend',
                relationship_type_created_at: now,
                relationship_type_updated_at: now,
            },
            // Agregar más tipos de relación 
        ],
    });
}