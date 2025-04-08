import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBranchDto {

    @IsUUID()
    @IsNotEmpty()
    institution_id: string;

    @IsString()
    @IsNotEmpty()
    branch_name: string;

    @IsString()
    @IsOptional()
    branch_longitude?: string;

    @IsString()
    @IsOptional()
    branch_latitude?: string;

    @IsString()
    @IsOptional()
    branch_description?: string;
}
