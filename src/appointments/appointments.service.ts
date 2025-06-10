import { PrismaClient } from '@prisma/client';
import { BadRequestException, HttpException, Injectable, OnModuleInit } from '@nestjs/common';

import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';
import { AppointmentStatusChangeDto } from './interfaces/appointment-status-change.dto';
import { CreateAppointmentDto, ScheduleAppointmentDto, UpdateAppointmentDto, CancelAppointmentDto } from './dto';
import { EmailService } from 'src/common/services/email/email.service';

@Injectable()
export class AppointmentsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }
    constructor(
        private readonly emailService: EmailService,
    ) {
        super();
    }

    async create(
        createAppointmentDto: CreateAppointmentDto,
        patientUserId: string,
        filesWithComments: { file: Express.Multer.File, comment: string | null }[]
    ) {
        try {
            const {
                nonRegisteredPatientId,
                branchId,
                medicalProcedureId,
            } = createAppointmentDto;

            // Validar si el usuario existe
            const patientExists = await this.user.findUnique({
                where: {
                    user_id: patientUserId,
                },
            });

            if (!patientExists) {
                throw new Error('Patient does not exist');
            }

            // Validar si la sucursal existe
            const branchExists = await this.branch.findUnique({
                where: {
                    branch_id: branchId,
                },
            });

            if (!branchExists) {
                throw new Error('La sucursal no existe');
            }


            // Crear la cita médica
            const verifyPatientAppointment = await this.medical_appointment.findFirst({
                where: {
                    //non_registered_patient_id: nonRegisteredPatientId,
                    patient_user_id: patientUserId,
                    //branch_id: branchId,
                    medical_procedure_id: medicalProcedureId,
                    medical_appointment_state_id: {
                        in: [1, 2, 5, 6], //[Created,Scheduled,Rescheduled,Pending,In Progress]
                    },
                },
            });

            if (verifyPatientAppointment) {
                throw new Error('Ya hay una cita en curso');

            }

            // Crear la cita médica
            const appointment = await this.medical_appointment.create({
                data: {
                    non_registered_patient_id: nonRegisteredPatientId,
                    patient_user_id: patientUserId,
                    branch_id: branchId,
                    medical_procedure_id: medicalProcedureId,
                    medical_appointment_state_id: 1, // Estado inicial (Pendiente)
                },
            });

            // Subir los exámenes médicos si se proporcionaron archivos
            for (const { file, comment } of filesWithComments) {
                const medicalExamTypeFileId = await this.file_type.findFirst({
                    where: {
                        file_type_mime_type: file.mimetype
                    }
                });

                if (!medicalExamTypeFileId) {
                    throw new Error('Invalid file type');
                }

                await this.medical_exam.create({
                    data: {
                        medical_appointment_id: appointment.medical_appointment_id,
                        medical_exam_type_file_id: medicalExamTypeFileId.file_type_id,
                        medical_exam_name_file: file.filename,
                        medical_exam_path: file.path,
                        medical_exam_description: comment ?? 'Sin comentario',
                        medical_exam_origin_examp: false,
                        medical_exam_date_up: new Date(),
                    },
                });
            }


            // Retornar respuesta de éxito
            return buildSuccessResponse(appointment, 'Cita creada con éxito');
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.log(error);

            // Manejo de errores
            return buildErrorResponse(error.message, error.status, 500);
        }
    }


    async findAll(findBy: string, id?: string) {
        try {
            const where = (() => {
                switch (findBy) {
                    case 'userId':
                        return { patient_user_id: id };
                    case 'branchId':
                        return { branch_id: id };
                    case 'doctorUserId':
                        return { doctor_user_id: id };
                    case 'institutionId':
                        return { branch: { institution_id: id } };
                    case 'all':
                        return undefined; // sin filtros
                    default:
                        throw new BadRequestException('Tipo de filtro inválido');
                }
            })();

            const appointments = await this.medical_appointment.findMany({
                where,
                select: {
                    medical_appointment_id: true,
                    medical_appointment_date_time: true,
                    medical_appointment_cancellation_reason: true,
                    medical_appointment_notes: true,
                    medical_appointment_created_at: true,
                    doctor_user: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    appointment_scheduler: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    patient_user: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    branch: {
                        select: {
                            branch_id: true,
                            branch_name: true,
                            branch_acronym: true,
                            branch_description: true,
                            branch_full_address: true,
                            institution: {
                                select: {
                                    institution_id: true,
                                    institution_name: true,
                                    institution_acronym: true,
                                    institution_description: true,
                                },
                            },
                        },
                    },
                    medical_appointment_state: {
                        select: {
                            medical_appointment_state_id: true,
                            medical_appointment_state_description: true,
                        },
                    },
                    medical_exam: {
                        select: {
                            medical_exam_id: true,
                            medical_exam_name_file: true,
                            medical_exam_path: true,
                            medical_exam_description: true,
                            medical_exam_origin_examp: true,
                            medical_exam_date_up: true,
                            file_type: {
                                select: {
                                    file_type_name: true,
                                    file_type_mime_type: true,
                                    file_type_extension: true,

                                }
                            }
                        }

                    }
                },
            });

            return buildSuccessResponse(appointments, 'Citas obtenidas con éxito');
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }



    async findAllByStatus(medicalAppointmentState: number) {
        try {

            // Validate if the appointment state exists
            const stateExists = await this.medical_appointment_state.findUnique({
                where: {
                    medical_appointment_state_id: medicalAppointmentState
                }
            });

            if (!stateExists) {
                throw new Error('El estado de cita no existe');
            }

            const appointments = await this.medical_appointment.findMany({
                select: {
                    medical_appointment_id: true,
                    medical_appointment_date_time: true,
                    medical_appointment_cancellation_reason: true,
                    medical_appointment_notes: true,
                    medical_appointment_created_at: true,
                    doctor_user: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    appointment_scheduler: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    patient_user: {
                        select: {
                            user_id: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },
                    branch: {
                        select: {
                            branch_id: true,
                            branch_name: true,
                            branch_acronym: true,
                            branch_description: true,
                            branch_full_address: true,
                            institution: {
                                select: {
                                    institution_id: true,
                                    institution_name: true,
                                    institution_acronym: true,
                                    institution_description: true,
                                },
                            },
                        },
                    },
                    medical_appointment_state: {
                        select: {
                            medical_appointment_state_id: true,
                            medical_appointment_state_description: true,
                        },
                    },
                    medical_exam: {
                        select: {
                            medical_exam_id: true,
                            medical_exam_name_file: true,
                            medical_exam_path: true,
                            medical_exam_description: true,
                            medical_exam_origin_examp: true,
                            medical_exam_date_up: true,
                            file_type: {
                                select: {
                                    file_type_name: true,
                                    file_type_mime_type: true,
                                    file_type_extension: true,

                                }
                            }
                        }

                    }
                },
                where: {
                    medical_appointment_state_id: medicalAppointmentState
                }
            });

            return buildSuccessResponse(appointments, 'Citas obtenidas con éxito');
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse(error.message, error.status, 500);
        }
    }

    async schedule(
        medicalAppointmentId: string,
        dto: ScheduleAppointmentDto,
        schedulerId: string,
    ) {
        try {
            const { doctorUserId, medicalAppointmentDateTime } = dto;

            const existingAppointment = await this.medical_appointment.findFirst({
                where: {
                    medical_appointment_id: medicalAppointmentId,
                    medical_appointment_state_id: 2, // cita ya asignada
                },
            });

            if (existingAppointment) {
                throw new Error('La cita ya fue asignada a un doctor y un horario');
            }

            // Validar que el doctor no tenga otra cita en esa hora
            const conflictingAppointment = await this.medical_appointment.findFirst({
                where: {
                    doctor_user_id: doctorUserId,
                    medical_appointment_date_time: new Date(medicalAppointmentDateTime),
                    medical_appointment_state_id: {
                        in: [2, 5, 6, 8], // Estados activos: programada, reagendada, en progreso
                    },
                },
            });

            if (conflictingAppointment) {
                throw new Error('El doctor ya tiene una cita programada en esa hora');
            }

            await this.addAppointmentStatusHistory({
                medicalAppointmentId,
                previousStatusId: 1, // Pendiente
                newStatusId: 2,      // Asignada
            });

            const doctor = await this.user.findUnique({
                where: { user_id: doctorUserId },
            });

            if (!doctor) {
                throw new Error('El doctor no existe');
            }

            const now = new Date();
            if (new Date(medicalAppointmentDateTime) <= now) {
                throw new Error('La fecha de la cita no puede ser en el pasado');
            }

            const updatedAppointment = await this.medical_appointment.update({
                where: { medical_appointment_id: medicalAppointmentId },
                data: {
                    doctor_user_id: doctorUserId,
                    appointment_scheduler_id: schedulerId,
                    medical_appointment_date_time: medicalAppointmentDateTime,
                    medical_appointment_state_id: 2, // estado: programada
                },
            });

            if (updatedAppointment.patient_user_id && updatedAppointment.doctor_user_id) {
                let existingChat = await this.chat.findFirst({
                    where: {
                        OR: [
                            {
                                chat_user_id: updatedAppointment.patient_user_id,
                                chat_doctor_id: updatedAppointment.doctor_user_id,
                            },
                            {
                                chat_user_id: updatedAppointment.doctor_user_id,
                                chat_doctor_id: updatedAppointment.patient_user_id,
                            },
                        ],
                    },
                });

                if (!existingChat) {
                    await this.chat.create({
                        data: {
                            chat_user_id: updatedAppointment.patient_user_id,
                            chat_doctor_id: updatedAppointment.doctor_user_id,
                        },
                    });
                }

                const email = await this.user.findUnique({
                    select: {
                        user_email: true,
                    },
                    where: {
                        user_id: updatedAppointment.patient_user_id,
                    }
                })
                console.log(email);

                if (email && email.user_email) {
                    await this.emailService.sendAppointmentConfirmationEmail(email.user_email, new Date(medicalAppointmentDateTime).toISOString());
                } else {
                    throw new Error('El correo electrónico del paciente no está disponible');
                }

            } else {
                throw new Error('El usuario del paciente o del doctor no está definido para crear el chat');
            }

            return buildSuccessResponse(updatedAppointment, 'Cita programada con éxito');
        } catch (error) {
            console.log(error);

            if (error instanceof HttpException) throw error;
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }



    private async addAppointmentStatusHistory({
        medicalAppointmentId,
        previousStatusId,
        newStatusId,
    }: AppointmentStatusChangeDto) {
        return await this.appointment_status_history.create({
            data: {
                medical_appointment_id: medicalAppointmentId,
                previous_status_id: previousStatusId,
                new_status_id: newStatusId,
                fecha_hora: new Date(),
            },
        });
    }



    async findOne(id: string) {
        try {
            const appointment = await this.medical_appointment.findUnique({
                where: {
                    medical_appointment_id: id,
                },
                select: {
                    medical_appointment_date_time: true,
                    medical_appointment_cancellation_reason: true,
                    medical_appointment_notes: true,
                    medical_appointment_created_at: true,
                    medical_procedure: {
                        select: {
                            medical_procedure_name: true,
                            medical_procedure_photo_url: true,
                            medical_procedure_estimated_duration: true,
                            medical_procedure_requires_confirmation: true,
                            medical_procedure_cost: true,
                            medical_procedure_available_online: true,
                            medical_procedure_available_slots: true,
                            medical_procedure_is_active: true,
                            specialty: {
                                select: {
                                    specialty_name: true,
                                    specialt_description: true

                                }
                            }

                        }
                    },
                    branch: {
                        select: {
                            branch_name: true,
                            branch_acronym: true,
                            branch_description: true,
                            branch_full_address: true,
                            institution: {
                                select: {
                                    institution_name: true,
                                    institution_acronym: true,
                                    institution_description: true,
                                },
                            },
                        },
                    },

                    non_registered_patient: {
                        select: {
                            relationship_type: {
                                select: {
                                    relationship_type_description: true,
                                },
                            },
                            non_registered_patient_gender: true,
                            non_registered_patient_first_name: true,
                            non_registered_patient_second_name: true,
                            non_registered_patient_thrid_name: true,
                            non_registered_patient_first_lastname: true,
                            non_registered_patient_second_lastname: true,
                            non_registered_patient_third_lastname: true,
                            non_registered_patient_birthdate: true,
                            non_registered_patient_phone_number: true,
                            non_registered_patient_dui: true,
                            non_registered_patient_address: true,
                            non_registered_patient_email: true,
                            non_registered_patient_genero: true,
                        },
                    },

                    medical_exam: true,

                    doctor_user: {
                        select: {
                            user_state_id: true,
                            user_gender: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },

                    patient_user: {
                        select: {
                            user_state_id: true,
                            user_gender: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        },
                    },

                    medical_appointment_state: {
                        select: {
                            medical_appointment_state_description: true,
                        },
                    },

                    prescription: {
                        select: {
                            prescription_notes: true,
                            prescription_fecha_emision: true,
                            prescription_item: {
                                select: {
                                    prescription_item_medication_name: true,
                                    prescription_item_dosage: true,
                                    prescription_item_frequency: true,
                                    prescription_item_duration: true,
                                    prescription_item_unit: true,
                                    prescription_item_item_notes: true,
                                }
                            }
                        }

                    },
                },
            });

            return buildSuccessResponse(appointment, 'Citas obtenidas con éxito');
        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse('Error interno del servidor', error, 500);
        }

    }

    update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
        return `This action updates a #${id} appointment`;
    }

    async remove(id: string, cancelAppointmentDto: CancelAppointmentDto) {

        try {
            const { medicalAppointmentCancellationReason } = cancelAppointmentDto;

            // Obtener el estado anterior de la cita
            const appointment = await this.medical_appointment.findUnique({
                where: { medical_appointment_id: id },
                select: {
                    medical_appointment_state_id: true,
                },
            });

            if (!appointment) {

                throw new Error('La cita no existe');

            }

            await this.addAppointmentStatusHistory({
                medicalAppointmentId: id,
                previousStatusId: appointment.medical_appointment_state_id as number,
                newStatusId: 4,
            });

            const updatedAppointment = await this.medical_appointment.update({
                where: {
                    medical_appointment_id: id,
                },
                data: {
                    medical_appointment_cancellation_reason: medicalAppointmentCancellationReason,
                    medical_appointment_state_id: 4,
                },
            });

            return buildSuccessResponse(updatedAppointment, 'Cita fue cancelada con exito');
        } catch (error) {

            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }

    }

}
