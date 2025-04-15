import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBranchDto {

    @IsUUID()
    @IsNotEmpty()
    institutionId: string;

    @IsString()
    @IsNotEmpty()
    branchName: string;

    @IsString()
    @IsNotEmpty()
    branchAcronym: string;

    @IsString()
    @IsOptional()
    branchLongitude?: string;

    @IsString()
    @IsOptional()
    branchLatitude?: string;

    @IsString()
    @IsOptional()
    branchFullAddress?: string;

    @IsString()
    @IsOptional()
    branchDescription?: string;




}
