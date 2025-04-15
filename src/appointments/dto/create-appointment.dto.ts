import { IsOptional, IsString, IsNumber, IsDate, IsNotEmpty, IsUUID, IsArray } from 'class-validator';
import { Type } from 'class-transformer'; // <-- Asegurate de importar esto

export class CreateAppointmentDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    nonRegisteredPatientId?: number;

    @IsNotEmpty()
    @IsUUID()
    branchId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    medicalProcedureId: string;


    @IsArray()
    comments: string[]

}
