import { IsOptional, IsUUID, IsBooleanString } from 'class-validator';

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

    @IsOptional()
    @IsBooleanString() // 'true' o 'false' como string (query param)
    all?: string;
}
