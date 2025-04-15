import { IsString, IsNumber } from 'class-validator';

export class CreatePrescriptionItemDto {

    @IsNumber()
    administrationRouteId: number;

    @IsString()
    prescriptionItemMedicationName: string;

    @IsString()
    prescriptionItemDosage: string;

    @IsString()
    prescriptionItemFrequency: string;

    @IsString()
    prescriptionItemDuration: string;

    @IsString()
    prescriptionItemUnit: string;

    @IsString()
    prescriptionItemItemNotes: string;
}
