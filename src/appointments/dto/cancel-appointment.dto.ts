import { Min } from "@nestjs/class-validator";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CancelAppointmentDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    medicalAppointmentCancellationReason: string

}
