import { PrismaClient } from '@prisma/client';
import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';

import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';
import { AppointmentStatusChangeDto } from './interfaces/appointment-status-change.dto';
import { CreateAppointmentDto, ScheduleAppointmentDto, UpdateAppointmentDto } from './dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
@Injectable()
export class AppointmentsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }
    async create(createAppointmentDto: CreateAppointmentDto) {
        try {
            const {
                nonRegisteredPatientId,
                patientUserId,
                branchId,
                specialtyId,
            } = createAppointmentDto;

            // Validate if the user exists
            const patientExists = await this.user.findUnique({
                where: {
                    user_id: patientUserId,
                },
            });

            if (!patientExists) {
                throw new Error('patient does not exist');
            }
            // Validate if the branch exists
            const branchExists = await this.branch.findUnique({
                where: {
                    branch_id: branchId,
                },
            });

            if (!branchExists) {
                throw new Error('Branch does not exist');
            }

            const appointment = await this.medical_appointment.create({
                data: {
                    non_registered_patient_id: nonRegisteredPatientId,
                    patient_user_id: patientUserId,
                    branch_id: branchId,
                    specialty_id: specialtyId,
                    medical_appointment_state_id: 1,
                },
            });
            return buildSuccessResponse(appointment, 'Cita creada con exito');
        } catch (error) {
            if (error instanceof HttpException) throw error;

            return buildErrorResponse(error.message, error.status, 500);

        }
    }

    async findAll() {
        try {
            const appointments = await this.medical_appointment.findMany();
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

            return buildSuccessResponse(updatedAppointment, 'Cita programada con éxito');
        } catch (error) {
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
                    specialty: {
                        select: {
                            specialty_name: true,
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
