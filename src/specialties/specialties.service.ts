import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class SpecialtiesService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }

    async create(createSpecialtyDto: CreateSpecialtyDto) {
        try {

            const { specialtyName, specialtyDescription } = createSpecialtyDto;


            const branches = await this.specialty.create({
                data: {
                    specialty_name: specialtyName,
                    specialt_description: specialtyDescription ?? '',
                    specialt_status: true
                },
            });

            return buildSuccessResponse(branches)


        } catch (error) {

            // Si es una excepción HTTP, se lanza
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async addSpecialtyToUser(userId: string, specialtyId: number) {
        try {
            const userSpecialty = await this.users_specialty.create({
                data: {
                    user_id: userId,
                    specialty_id: specialtyId,
                },
            });

            return buildSuccessResponse(userSpecialty);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }

    async removeSpecialtyFromUser(userId: string, specialtyId: number) {
        try {
            const deletedUserSpecialty = await this.users_specialty.deleteMany({
                where: {
                    user_id: userId,
                    specialty_id: specialtyId,
                },
            });

            if (deletedUserSpecialty.count === 0) {
                return buildErrorResponse('No se encontró la relación entre el usuario y la especialidad', 404);
            }

            return buildSuccessResponse(deletedUserSpecialty);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async findAll() {
        try {
            const specialties = await this.specialty.findMany({
                where: {
                    specialt_status: true
                }
            });

            return buildSuccessResponse(specialties);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async findOne(id: number) {
        try {
            const specialty = await this.specialty.findUnique({
                where: { specialty_id: id, specialt_status: true },
            });

            if (!specialty) {
                return buildErrorResponse('Specialty not found', 404);
            }

            return buildSuccessResponse(specialty);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
        try {
            const { specialtyName, specialtyDescription } = updateSpecialtyDto;

            const updatedSpecialty = await this.specialty.update({
                where: { specialty_id: id },
                data: {
                    specialty_name: specialtyName,
                    specialt_description: specialtyDescription ?? '',
                },
            });

            return buildSuccessResponse(updatedSpecialty);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async remove(id: number) {
        try {
            const deletedSpecialty = await this.specialty.update({
                where: { specialty_id: id },
                data: { specialt_status: false },
            });

            return buildSuccessResponse(deletedSpecialty);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }
    }
}
