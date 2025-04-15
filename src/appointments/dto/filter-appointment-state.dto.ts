import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class FilterAppointmentStateDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    medicalAppointmentState: number;
}

