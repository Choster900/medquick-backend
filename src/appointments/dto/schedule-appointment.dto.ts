import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ScheduleAppointmentDto {

    @IsString()
    @IsNotEmpty()
    doctorUserId: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    medicalAppointmentDateTime: Date;
}
