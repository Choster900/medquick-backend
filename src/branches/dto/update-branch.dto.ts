import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {

    @ApiPropertyOptional({ description: 'Estado de la sucursal (activa o inactiva)' })
    @IsOptional()
    @IsBoolean()
    branchStatus: boolean;
}
