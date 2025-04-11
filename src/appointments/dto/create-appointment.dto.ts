import { IsOptional, IsString, IsNumber, IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAppointmentDto {


    @IsOptional()
    @IsNumber()
    nonRegisteredPatientId?: number;

    @IsOptional()
    @IsUUID()
    patientUserId?: string;

    /* @IsOptional()
    @IsUUID()
    doctorUserId?: string; */

   /*  @IsNotEmpty()
    @IsUUID()
    appointmentSchedulerId: string; */

    @IsNotEmpty()
    @IsUUID()
    branchId: string;

    @IsNotEmpty()
    specialtyId: number;

   /*  @IsNotEmpty()
    medicalAppointmentStateId: number; */

    /* @IsNotEmpty()
    @IsDate()
    medicalAppointmentDateTime: Date; */

   /*  @IsOptional()
    @IsString()
    medicalAppointmentCancellationReason?: string; */

    /* @IsOptional()
    @IsString()
    medicalAppointmentNotes?: string; */
}
