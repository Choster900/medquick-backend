import { IsOptional, IsUUID } from 'class-validator';

export class FindAppointmentsDto {
    @IsOptional()
    @IsUUID()
    userId?: string;

    @IsOptional()
    @IsUUID()
    branchId?: string;

    @IsOptional()
    @IsUUID()
    doctorUserId?: string;

    @IsOptional()
    @IsUUID()
    institutionId?: string;
}
