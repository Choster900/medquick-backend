import { IsOptional, IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
    @IsOptional()
    nonRegisteredPatientId?: number;

    @IsOptional()
    patientUserId?: string;

    @IsOptional()
    doctorUserId?: string;

    @IsNotEmpty()
    appointmentSchedulerId: string;

    @IsNotEmpty()
    branchId: string;

    @IsNotEmpty()
    specialtyId: number;

    @IsNotEmpty()
    medicalAppointmentStateId: number;

    @IsNotEmpty()
    @IsDate()
    medicalAppointmentDateTime: Date;

    @IsOptional()
    @IsString()
    medicalAppointmentCancellationReason?: string;

    @IsOptional()
    @IsString()
    medicalAppointmentNotes?: string;
}
