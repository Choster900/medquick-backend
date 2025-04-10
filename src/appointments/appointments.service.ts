import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppointmentsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }
    async create(createAppointmentDto: CreateAppointmentDto) {

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
        } = createAppointmentDto

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
