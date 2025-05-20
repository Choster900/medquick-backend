import {
    IsString,
    IsOptional,
    IsUUID,
    IsNotEmpty,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionItemDto } from './create-prescription-item.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrescriptionDto {

    @ApiProperty({ format: 'uuid', description: 'UUID of the medical appointment' })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    medicalAppointmentId: string;

    @ApiPropertyOptional({ description: 'General notes for the prescription' })
    @IsOptional()
    @IsString()
    prescriptionNotes?: string;

    @ApiProperty({ type: [CreatePrescriptionItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePrescriptionItemDto)
    prescriptionItem: CreatePrescriptionItemDto[];
}
