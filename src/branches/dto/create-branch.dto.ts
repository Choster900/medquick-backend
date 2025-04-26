import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {

    @ApiProperty({ description: 'UUID de la institución a la que pertenece la sucursal' })
    @IsUUID()
    @IsNotEmpty()
    institutionId: string;

    @ApiProperty({ description: 'Nombre de la sucursal' })
    @IsString()
    @IsNotEmpty()
    branchName: string;

    @ApiProperty({ description: 'Acrónimo de la sucursal' })
    @IsString()
    @IsNotEmpty()
    branchAcronym: string;

    @ApiPropertyOptional({ description: 'Longitud geográfica de la sucursal' })
    @IsString()
    @IsOptional()
    branchLongitude?: string;

    @ApiPropertyOptional({ description: 'Latitud geográfica de la sucursal' })
    @IsString()
    @IsOptional()
    branchLatitude?: string;

    @ApiPropertyOptional({ description: 'Dirección completa de la sucursal' })
    @IsString()
    @IsOptional()
    branchFullAddress?: string;

    @ApiPropertyOptional({ description: 'Descripción adicional de la sucursal' })
    @IsString()
    @IsOptional()
    branchDescription?: string;
}
