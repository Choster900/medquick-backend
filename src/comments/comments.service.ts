import { ForbiddenException, HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';
import { CreateBranchCommentDto, CreateMedicalCommentDto, UpdateBranchCommentDto, UpdateMedicalCommentDto } from './dto';

@Injectable()
export class CommentsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }


    async createBranchComment(branchId: string, dto: CreateBranchCommentDto) {
        try {
            const existingComment = await this.branch_comment.findFirst({
                where: {
                    user_id: dto.userId,
                    branch_id: branchId,
                },
            });

            if (existingComment) {
                return buildErrorResponse('Ya has dejado un comentario para este médico. ', 404);

            }

            const comment = await this.branch_comment.create({
                data: {
                    branch_id: branchId,
                    user_id: dto.userId,
                    branch_comment_comment: dto.branchCommentComment,
                    branch_comment_rating: dto.branchCommentRating,
                },
            });

            return buildSuccessResponse(comment);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }




    async createMedicalComment(medicalId: string, dto: CreateMedicalCommentDto) {
        try {
            const existingComment = await this.medical_comment.findFirst({
                where: {
                    user_id: dto.userId,
                    id_medico: medicalId,
                },
            });

            if (existingComment) {
                return buildErrorResponse('Ya has dejado un comentario para esta sucursal. ', 404);
            }

            const comment = await this.medical_comment.create({
                data: {
                    user_id: dto.userId,
                    id_medico: medicalId,
                    medical_comment_comment: dto.medicalCommentComment,
                    medical_comment_rating: dto.medicalCommentRating,
                },
            });

            return buildSuccessResponse(comment);
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }

    // comments.service.ts

    async updateBranchComment(branchCommentId: number, dto: UpdateBranchCommentDto) {
        try {
            const existing = await this.branch_comment.findUnique({
                where: { branch_comment_id: branchCommentId },
            });

            if (!existing) throw new HttpException('Comentario no encontrado', 404);

            if (existing.user_id !== dto.userId) {
                throw new ForbiddenException('No puedes editar este comentario');
            }

            const updated = await this.branch_comment.update({
                where: { branch_comment_id: branchCommentId },
                data: {
                    branch_comment_comment: dto.branchCommentComment,
                    branch_comment_rating: dto.branchCommentRating,
                },
            });

            return buildSuccessResponse(updated);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error al actualizar el comentario de sucursal', error, 500);
        }
    }

    async updateMedicalComment(medicalCommentId: number, dto: UpdateMedicalCommentDto) {
        try {
            const existing = await this.medical_comment.findUnique({
                where: { medical_comment_id: medicalCommentId },
            });

            if (!existing) throw new HttpException('Comentario no encontrado', 404);

            if (existing.user_id !== dto.userId) {
                throw new ForbiddenException('No puedes editar este comentario');
            }

            const updated = await this.medical_comment.update({
                where: { medical_comment_id: medicalCommentId },
                data: {
                    medical_comment_comment: dto.medicalCommentComment,
                    medical_comment_rating: dto.medicalCommentRating,
                },
            });

            return buildSuccessResponse(updated);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error al actualizar el comentario médico', error, 500);
        }
    }

    async deleteBranchComment(commentId: number, userId: string) {
        try {
            const comment = await this.branch_comment.findUnique({
                where: { branch_comment_id: commentId },
            });

            if (!comment) return buildErrorResponse('Comentario no encontrado', 400);
            if (comment.user_id !== userId) return buildErrorResponse('No puedes eliminar este comentario', 400);

            await this.branch_comment.delete({
                where: { branch_comment_id: commentId },
            });

            return buildSuccessResponse('Comentario de sucursal eliminado');
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error al eliminar comentario de sucursal', error, 500);
        }
    }

    async deleteMedicalComment(commentId: number, userId: string) {
        try {
            const comment = await this.medical_comment.findUnique({
                where: { medical_comment_id: commentId },
            });

            if (!comment) return buildErrorResponse('Comentario no encontrado', 400);
            if (comment.user_id !== userId) return buildErrorResponse('No puedes eliminar este comentario', 400);

            await this.medical_comment.delete({
                where: { medical_comment_id: commentId },
            });

            return buildSuccessResponse('Comentario médico eliminado');
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error al eliminar comentario médico', error, 500);
        }
    }

    // comments.service.ts

    async getCommentsByMedical(medicalId: string) {
        try {
            const comments = await this.medical_comment.findMany({
                where: { id_medico: medicalId },
                orderBy: { medical_comment_created_at: 'desc' },
                include: {
                    user: {
                        select: {
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_create_at: true,
                            user_update_at: true,

                        }
                    }
                },
            });

            return buildSuccessResponse(comments);
        } catch (error) {
            return buildErrorResponse('Error al obtener comentarios del médico', error, 500);
        }
    }

    async getCommentsByBranch(branchId: string) {
        try {
            const comments = await this.branch_comment.findMany({
                where: { branch_id: branchId },
                orderBy: { branch_comment_created_at: 'desc' },
                include: {
                    user: {
                        select: {
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_create_at: true,
                            user_update_at: true,

                        }
                    }
                },
            });

            return buildSuccessResponse(comments);
        } catch (error) {
            return buildErrorResponse('Error al obtener comentarios de la sucursal', error, 500);
        }
    }


    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }


}
