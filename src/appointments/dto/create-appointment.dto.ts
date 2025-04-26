import { IsOptional, IsString, IsNumber, IsDate, IsNotEmpty, IsUUID, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer'; // <-- Asegurate de importar esto

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


    @Transform(({ value }) =>
        Array.isArray(value) ? value : typeof value === 'string' ? [value] : [],
    )
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    comments: string[];

}
