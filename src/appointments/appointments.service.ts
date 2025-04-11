import { PrismaClient } from '@prisma/client';
import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateAppointmentDto, ScheduleAppointmentDto, UpdateAppointmentDto } from './dto';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

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

            return buildErrorResponse('Error interno del servidor', error, 500);

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
            return buildErrorResponse('Error interno del servidor', error, 500);
        }
    }

    async schedule(medicalAppointmentId: string, scheduleAppointmentDto: ScheduleAppointmentDto) {
        try {
            // TODO: Investigar si se puede obtener el jwt del usuario que hace la solicitud
            // Para depues obtener su id y asignarle el appointment_scheduler_id
            const { doctorUserId, medicalAppointmentDateTime } = scheduleAppointmentDto;

            // Validate if the doctor exists
            const doctorExists = await this.user.findUnique({
                where: {
                    user_id: doctorUserId,
                },
            });

            if (!doctorExists) {
                throw new Error('El doctor no existe');
            }

            // Validate if the appointment date time is in the future
            if (medicalAppointmentDateTime < new Date()) {
                throw new Error('La fecha de la cita no puede ser en el pasado');
            }

            // update appointment
            const updatedAppointment = await this.medical_appointment.update({
                where: {
                    medical_appointment_id: medicalAppointmentId,
                },
                data: {
                    medical_appointment_date_time: medicalAppointmentDateTime,
                    doctor_user_id: doctorUserId,
                },
            });

            return buildSuccessResponse(updatedAppointment, 'Cita programada con éxito');

        } catch (error) {
            if (error instanceof HttpException) throw error;
            return buildErrorResponse(error.message, error.status, 500);
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} appointment`;
    }

    update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
        return `This action updates a #${id} appointment`;
    }

    remove(id: number) {
        return `This action removes a #${id} appointment`;
    }
}
