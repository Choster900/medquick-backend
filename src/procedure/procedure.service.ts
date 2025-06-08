import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { PrismaClient } from '@prisma/client';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class ProcedureService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }

    async create(createProcedureDto: CreateProcedureDto) {

        try {
            const {
                specialtyId,
                medicalProcedureName,
                medicalProcedurePhotoUrl,
                medicalProcedureEstimatedDuration,
                medicalProcedureRequiresConfirmation,
                medicalProcedureCost,
                medicalProcedureAvailableOnline,
                medicalProcedureAvailableSlots,
                examsnRequired,
                branchId,
            } = createProcedureDto;


            if (examsnRequired && examsnRequired.length > 0) {
                const foundExams = await this.exam.findMany({
                    where: {
                        exam_id: {
                            in: examsnRequired,
                        },
                    },
                });

                if (foundExams.length !== examsnRequired.length) {
                    throw new Error('Uno o más exámenes no existen');
                }
            }

            // Crear el procedimiento
            const procedure = await this.medical_procedure.create({
                data: {
                    specialty_id: specialtyId,
                    branch_id: branchId,
                    medical_procedure_name: medicalProcedureName,
                    medical_procedure_photo_url: medicalProcedurePhotoUrl,
                    medical_procedure_estimated_duration: medicalProcedureEstimatedDuration,
                    medical_procedure_requires_confirmation: medicalProcedureRequiresConfirmation,
                    medical_procedure_cost: medicalProcedureCost,
                    medical_procedure_available_online: medicalProcedureAvailableOnline,
                    medical_procedure_available_slots: medicalProcedureAvailableSlots ?? 0,
                    medical_procedure_is_active: true,
                },
            });

            if (examsnRequired && examsnRequired.length > 0) {
                const relations = examsnRequired.map((examId) => ({
                    procedure_id: procedure.medical_procedure_id,
                    exam_id: examId,
                }));

                await this.procedure_required_exam.createMany({
                    data: relations,
                });
            }

            return buildSuccessResponse(procedure);

        } catch (error) {

            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }

    }

    async findAll(branchId?: string) {
        try {
            // Filtramos solo por specialtyId
            const procedures = await this.medical_procedure.findMany({
                where: branchId ? { branch_id: branchId } : {}, // Solo filtra si specialtyId está presente
                select: {
                    medical_procedure_id: true,
                    specialty_id: true,
                    specialty: {
                        select: {
                            specialty_id: true,
                            specialty_name: true,
                            specialt_description: true,
                        }
                    },
                    branch_id: true,
                    branch: {
                        select: {
                            branch_id: true,
                            institution_id: true,
                            branch_name: true,
                            branch_acronym: true,
                            branch_status: true,
                        }
                    },
                    medical_procedure_name: true,
                    medical_procedure_photo_url: true,
                    medical_procedure_estimated_duration: true,
                    medical_procedure_requires_confirmation: true,
                    medical_procedure_cost: true,
                    medical_procedure_available_online: true,
                    medical_procedure_available_slots: true,
                    medical_procedure_is_active: true
                }

                /* include: {
                    specialty: true, // Incluye la especialidad
                    required_exams: {
                        include: {
                            exam: true, // Incluye los exámenes asociados
                        },
                    },
                    branch: true
                }, */
            });

            return buildSuccessResponse(procedures, 'Procedimientos obtenidos con éxito');
        } catch (error) {
            return buildErrorResponse(error.message || 'Error interno del servidor', 500);
        }
    }

    async findOne(id: string) {
        try {
            const procedure = await this.medical_procedure.findUnique({
                where: {
                    medical_procedure_id: id,
                },
                include: {
                    specialty: true, // Incluye la especialidad
                    required_exams: {
                        include: {
                            exam: true, // Incluye los exámenes
                        },
                    },
                },
            });

            if (!procedure) {
                throw new Error('Procedimiento no encontrado');
            }

            return buildSuccessResponse(procedure, 'Procedimiento encontrado con éxito');
        } catch (error) {
            return buildErrorResponse(error.message || 'Error interno del servidor', 500);
        }
    }


    async update(id: string, updateProcedureDto: UpdateProcedureDto) {
        try {
            const {
                specialtyId,
                medicalProcedureName,
                medicalProcedurePhotoUrl,
                medicalProcedureEstimatedDuration,
                medicalProcedureRequiresConfirmation,
                medicalProcedureCost,
                medicalProcedureAvailableOnline,
                medicalProcedureAvailableSlots,
                examsnRequired,
            } = updateProcedureDto;

            // Verificamos si el procedimiento existe
            const procedure = await this.medical_procedure.findUnique({
                where: { medical_procedure_id: id },
            });

            if (!procedure) {
                throw new Error('Procedimiento no encontrado');
            }

            // Actualizamos el procedimiento
            const updatedProcedure = await this.medical_procedure.update({
                where: { medical_procedure_id: id },
                data: {
                    specialty_id: specialtyId ?? procedure.specialty_id, // No modificar si no se pasa el valor
                    medical_procedure_name: medicalProcedureName ?? procedure.medical_procedure_name,
                    medical_procedure_photo_url: medicalProcedurePhotoUrl ?? procedure.medical_procedure_photo_url,
                    medical_procedure_estimated_duration: medicalProcedureEstimatedDuration ?? procedure.medical_procedure_estimated_duration,
                    medical_procedure_requires_confirmation: medicalProcedureRequiresConfirmation ?? procedure.medical_procedure_requires_confirmation,
                    medical_procedure_cost: medicalProcedureCost ?? procedure.medical_procedure_cost,
                    medical_procedure_available_online: medicalProcedureAvailableOnline ?? procedure.medical_procedure_available_online,
                    medical_procedure_available_slots: medicalProcedureAvailableSlots ?? procedure.medical_procedure_available_slots,
                },
            });

            // Si se pasan nuevos exámenes requeridos, los actualizamos
            if (examsnRequired && examsnRequired.length > 0) {
                const foundExams = await this.exam.findMany({
                    where: {
                        exam_id: {
                            in: examsnRequired,
                        },
                    },
                });

                if (foundExams.length !== examsnRequired.length) {
                    throw new Error('Uno o más exámenes no existen');
                }

                // Eliminar los exámenes previamente asociados al procedimiento
                await this.procedure_required_exam.deleteMany({
                    where: {
                        procedure_id: id,
                    },
                });

                // Crear las nuevas relaciones de exámenes
                const relations = examsnRequired.map((examId) => ({
                    procedure_id: id,
                    exam_id: examId,
                }));

                await this.procedure_required_exam.createMany({
                    data: relations,
                });
            }

            return buildSuccessResponse(updatedProcedure, 'Procedimiento actualizado con éxito');
        } catch (error) {
            return buildErrorResponse(error.message || 'Error interno del servidor', 500);
        }
    }


    async remove(id: string) {
        try {
            // Verificamos si el procedimiento existe
            const procedure = await this.medical_procedure.findUnique({
                where: { medical_procedure_id: id },
            });

            if (!procedure) {
                throw new Error('Procedimiento no encontrado');
            }

            // Cambiar el estado del procedimiento a inactivo
            const updatedProcedure = await this.medical_procedure.update({
                where: { medical_procedure_id: id },
                data: {
                    medical_procedure_is_active: false, // Marcamos el procedimiento como inactivo
                },
            });

            return buildSuccessResponse(updatedProcedure, 'Gestion desactivado con éxito');
        } catch (error) {
            return buildErrorResponse(error.message || 'Error interno del servidor', 500);
        }
    }

}
