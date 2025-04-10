import { HttpException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient } from '@prisma/client';

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
                doctorUserId,
                appointmentSchedulerId,
                branchId,
                specialtyId,
                medicalAppointmentStateId,
                medicalAppointmentDateTime,
                medicalAppointmentCancellationReason,
                medicalAppointmentNotes
            } = createAppointmentDto;

            // Validate if the user exists
            const userExists = await this.user.findUnique({
                where: {
                    user_id: patientUserId,
                },
            });

            if (!userExists) {
                throw new Error('User does not exist');
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
                    doctor_user_id: doctorUserId,
                    appointment_scheduler_id: appointmentSchedulerId,
                    branch_id: branchId,
                    specialty_id: specialtyId,
                    medical_appointment_state_id: medicalAppointmentStateId,
                    medical_appointment_date_time: medicalAppointmentDateTime,
                    medical_appointment_cancellation_reason: medicalAppointmentCancellationReason,
                    medical_appointment_notes: medicalAppointmentNotes,
                },
            });
            return appointment;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException('Error interno del servidor');
        }
    }

    findAll() {
        return `This action returns all appointments`;
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
