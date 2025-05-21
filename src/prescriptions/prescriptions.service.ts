import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrismaClient } from '@prisma/client';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class PrescriptionsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }

    async create(createPrescriptionDto: CreatePrescriptionDto) {


        try {
            const { medicalAppointmentId, prescriptionNotes, prescriptionItem } = createPrescriptionDto;


            const existingAppointment = await this.medical_appointment.findFirst({
                where: {
                    medical_appointment_id: medicalAppointmentId,
                },
            });

            if (!existingAppointment) {
                throw new Error('No existe la cita');
            }

            const existingPrescription = await this.prescription.findFirst({
                where: {
                    medical_appointment_id: medicalAppointmentId,
                },
            });

            if (existingPrescription) {
                throw new Error('La cita ya tiene prescipcion. modifica la que ya tiene');
            }

            const prescriptionAndItems = await this.prescription.create({
                data: {
                    medical_appointment_id: medicalAppointmentId,
                    prescription_notes: prescriptionNotes,
                    prescription_fecha_emision: new Date(),
                    prescription_item: {
                        create: prescriptionItem.map((item) => ({
                            administration_route_id: item.administrationRouteId,
                            prescription_item_medication_name: item.prescriptionItemMedicationName,
                            prescription_item_dosage: item.prescriptionItemDosage,
                            prescription_item_frequency: item.prescriptionItemFrequency,
                            prescription_item_duration: item.prescriptionItemDuration,
                            prescription_item_unit: item.prescriptionItemUnit,
                            prescription_item_item_notes: item.prescriptionItemItemNotes,
                        })),
                    },
                },
                include: {
                    prescription_item: true,
                },
            });

            await this.medical_appointment.update({
                where: {
                    medical_appointment_id: medicalAppointmentId
                },
                data: {
                    medical_appointment_state_id: 3
                }
            })

            return buildSuccessResponse(prescriptionAndItems, "Prescipcion creada");
        } catch (error) {

            if (error instanceof HttpException) throw error;
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }

    }



    async findAll() {
        return this.prescription.findMany({
            include: {
                prescription_item: true,
                medical_appointment: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prescription.findUnique({
            where: {
                prescription_id: id,
            },
            include: {
                prescription_item: true,
                medical_appointment: true,
            },
        });
    }

    // TODO : Actualizar presciption nada mas / para actualizar items se actualizara independiente
    update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
        return `This action updates a #${id} prescription`;
    }

    remove(id: number) {
        return `This action removes a #${id} prescription`;
    }
}
