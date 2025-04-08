import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

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
            const { institutionDescription, institutionName } = createInstitutionDto

            const institution = await this.institution.create({
                data: {
                    institution_name: institutionName,
                    institution_description: institutionDescription
                }
            })

            return buildSuccessResponse(institution)
        } catch (error) {

            return buildErrorResponse('Error interno del servidor', 500);

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
            const { institutionDescription, institutionName } = updateInstitutionDto;

            const updatedInstitution = await this.institution.update({
                where: { institution_id: id },
                data: {
                    institution_name: institutionName,
                    institution_description: institutionDescription,
                },
            });

            return buildSuccessResponse(updatedInstitution);
        } catch (error) {
            return buildErrorResponse('Error interno del servidor', 500);
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
