import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CancelAppointmentDto {
    @ApiProperty({ description: 'Razón de la cancelación de la cita médica', minLength: 1 })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    medicalAppointmentCancellationReason: string;
}
