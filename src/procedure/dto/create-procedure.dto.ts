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
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcedureDto {
    @ApiProperty({
        description: 'ID de la especialidad médica',
        example: 1,
    })
    @IsNumber()
    @Type(() => Number)
    specialtyId: number;

    @ApiProperty({
        description: 'Nombre del procedimiento médico',
        example: 'Consulta General',
    })
    @IsString()
    medicalProcedureName: string;

    @ApiProperty({
        description: 'URL de la foto representativa del procedimiento',
        example: 'https://example.com/imagen.jpg',
    })
    @IsUrl()
    medicalProcedurePhotoUrl: string;

    @ApiProperty({
        description: 'Duración estimada del procedimiento (formato texto)',
        example: '30 minutos',
    })
    @IsString()
    medicalProcedureEstimatedDuration: string;

    @ApiProperty({
        description: 'Indica si requiere confirmación manual',
        example: true,
    })
    @IsBoolean()
    medicalProcedureRequiresConfirmation: boolean;

    @ApiProperty({
        description: 'Costo del procedimiento',
        example: 25.50,
        minimum: 1,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    @Type(() => Number)
    medicalProcedureCost: number;

    @ApiProperty({
        description: 'Indica si el procedimiento está disponible en línea',
        example: true,
    })
    @IsBoolean()
    medicalProcedureAvailableOnline: boolean;

    @ApiProperty({
        description: 'Cantidad de espacios disponibles para el procedimiento',
        example: 5,
        required: false,
    })
    @IsNumber()
    @Type(() => Number)
    medicalProcedureAvailableSlots?: number;

    @ApiProperty({
        description: 'IDs de los exámenes requeridos',
        example: [1, 2, 3],
        type: [Number],
        minItems: 1,
        uniqueItems: true,
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    examsnRequired: number[];
}
