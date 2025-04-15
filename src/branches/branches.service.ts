import { PrismaClient } from '@prisma/client';
import { ForbiddenException, HttpException, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class BranchesService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }
    async create(createBranchDto: CreateBranchDto) {


        try {

            const { branchName, branchAcronym, branchFullAddress, institutionId, branchDescription, branchLatitude, branchLongitude } = createBranchDto;

            const existingInstitution = await this.institution.findUnique({
                where: {
                    institution_id: institutionId,
                    institution_status: true
                },
            });

            if (!existingInstitution) {
                throw new ForbiddenException('La institucion no existe');
            }


            const branches = await this.branch.create({
                data: {
                    branch_name: branchName,
                    institution_id: institutionId,
                    branch_acronym: branchAcronym,
                    branch_full_address: branchFullAddress,
                    branch_description: branchDescription ?? '',
                    branch_latitude: branchLatitude,
                    branch_longitude: branchLongitude,
                },
            });

            return buildSuccessResponse(branches)


        } catch (error) {

            // Si es una excepción HTTP, se lanza
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', 500);
        }

    }

    async findAll() {
        try {
            const branches = await this.branch.findMany({ where: { branch_status: true } });
            return buildSuccessResponse(branches);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async findOne(id: string) {
        try {
            const branch = await this.branch.findUnique({
                where: {
                    branch_id: id,
                },
            });

            if (!branch) {
                throw new ForbiddenException('La sucursal no existe');
            }

            return buildSuccessResponse(branch);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }

    async update(id: string, updateBranchDto: UpdateBranchDto) {

        const { branchAcronym, institutionId, branchDescription, branchFullAddress, branchLatitude, branchLongitude } = updateBranchDto

        try {


            const branch = await this.branch.findUnique({
                where: {
                    branch_id: id,
                },
            });

            if (!branch) {
                throw new ForbiddenException('La sucursal no existe');
            }

            const existingInstitution = await this.institution.findUnique({
                where: {
                    institution_id: institutionId
                }
            });

            if (!existingInstitution) {
                throw new ForbiddenException('La institucion no existe');
            }

            const updatedBranch = await this.branch.update({
                where: {
                    branch_id: id,
                },
                data: {
                    branch_acronym: branchAcronym,
                    institution_id: institutionId,
                    branch_description: branchDescription,
                    branch_full_address: branchFullAddress,
                    branch_latitude: branchLatitude,
                    branch_longitude: branchLongitude
                },
            });

            return buildSuccessResponse(updatedBranch);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }

    async updateStatus(id: string, status: boolean) {
        try {
            const branch = await this.branch.findUnique({
                where: {
                    branch_id: id,
                },
            });

            if (!branch) {
                throw new ForbiddenException('La sucursal no existe');
            }

            const updatedBranch = await this.branch.update({
                where: {
                    branch_id: id,
                },
                data: {
                    branch_status: status,
                },
            });

            return buildSuccessResponse(updatedBranch);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', 500);
        }
    }
}
