import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionItemDto {

    @ApiProperty({ description: 'ID of the administration route' })
    @IsNumber()
    administrationRouteId: number;

    @ApiProperty({ description: 'Name of the medication' })
    @IsString()
    prescriptionItemMedicationName: string;

    @ApiProperty({ description: 'Dosage of the medication' })
    @IsString()
    prescriptionItemDosage: string;

    @ApiProperty({ description: 'Frequency of intake' })
    @IsString()
    prescriptionItemFrequency: string;

    @ApiProperty({ description: 'Duration of the treatment' })
    @IsString()
    prescriptionItemDuration: string;

    @ApiProperty({ description: 'Unit of measurement for dosage' })
    @IsString()
    prescriptionItemUnit: string;

    @ApiProperty({ description: 'Additional notes for the item' })
    @IsString()
    prescriptionItemItemNotes: string;
}
