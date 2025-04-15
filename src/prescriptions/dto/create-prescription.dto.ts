import {
    IsString,
    IsOptional,
    IsDateString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionItemDto } from './create-prescription-item.dto';

export class CreatePrescriptionDto {

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    medicalAppointmentId: string;

    @IsOptional()
    @IsString()
    prescriptionNotes?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePrescriptionItemDto)
    prescriptionItem: CreatePrescriptionItemDto[];
}
