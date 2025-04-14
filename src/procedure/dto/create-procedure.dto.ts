import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsString,
    IsUrl,
    Min,
    ArrayNotEmpty,
    ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProcedureDto {
    @IsNumber()
    @Type(() => Number)
    specialtyId: number;

    @IsString()
    medicalProcedureName: string;

    @IsUrl()
    medicalProcedurePhotoUrl: string;

    @IsString()
    medicalProcedureEstimatedDuration: string;

    @IsBoolean()
    medicalProcedureRequiresConfirmation: boolean;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    @Type(() => Number)
    medicalProcedureCost: number;

    @IsBoolean()
    medicalProcedureAvailableOnline: boolean;

    @IsNumber()
    @Type(() => Number)
    medicalProcedureAvailableSlots?: number;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    examsnRequired: number[];
}
