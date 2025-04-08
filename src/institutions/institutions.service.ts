import { PrismaClient } from '@prisma/client';
import { ForbiddenException, HttpException, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { buildErrorResponse } from 'src/common/helpers/error-response';
import { buildSuccessResponse } from 'src/common/helpers/success-response';


@Injectable()
export class InstitutionsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect();
    }

    async create(createInstitutionDto: CreateInstitutionDto) {

        try {
            const { institutionDescription, institutionName, institutionAcronym } = createInstitutionDto

            // Check if institution name or acronym already exists
            const existingInstitution = await this.institution.findFirst({
                where: {
                    OR: [
                        { institution_name: institutionName },
                        { institution_acronym: institutionAcronym },
                    ],
                },
            });

            if (existingInstitution) {
                throw new ForbiddenException('El nombre o acrónimo de la institución ya existe');
            }

            const institution = await this.institution.create({
                data: {
                    institution_acronym: institutionAcronym,
                    institution_name: institutionName,
                    institution_description: institutionDescription
                }
            })

            return buildSuccessResponse(institution)
        } catch (error) {

            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', error, 500);

        }


    }

    async findAll() {
        try {
            const institutions = await this.institution.findMany();
            return buildSuccessResponse(institutions);
        } catch (error) {
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async findOne(id: string) {
        try {
            const institution = await this.institution.findUnique({
                where: { institution_id: id },
            });

            if (!institution) {
                return buildErrorResponse('Institución no encontrada', 404);
            }

            return buildSuccessResponse(institution);
        } catch (error) {
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async update(id: string, updateInstitutionDto: UpdateInstitutionDto) {
        try {
            const { institutionDescription, institutionName, institutionAcronym } = updateInstitutionDto;

            // Buscar si existe otra institución (distinta al id actual) con el mismo nombre o acrónimo
            const conflictInstitution = await this.institution.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { institution_name: institutionName },
                                { institution_acronym: institutionAcronym },
                            ],
                        },
                        {
                            NOT: { institution_id: id },
                        },
                    ],
                },
            });

            if (conflictInstitution) {
                throw new ForbiddenException('Ya existe otra institución con el mismo nombre o acrónimo');
            }

            const updatedInstitution = await this.institution.update({
                where: { institution_id: id },
                data: {
                    institution_name: institutionName,
                    institution_acronym: institutionAcronym,
                    institution_description: institutionDescription,
                    institution_updated_at: new Date(),
                },
            });

            return buildSuccessResponse(updatedInstitution, 'Institución actualizada con éxito');
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }


    async remove(id: string) {
        try {
            const deletedInstitution = await this.institution.delete({
                where: { institution_id: id },
            });

            return buildSuccessResponse(deletedInstitution);
        } catch (error) {
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }
}
