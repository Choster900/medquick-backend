import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBranchStatusDto {
    @ApiProperty({
        description: 'Estado de la sucursal (activo o inactivo)',
        example: true,
    })
    @IsBoolean({ message: 'El estado de la sucursal debe ser un valor booleano' })
    branchStatus: boolean;
}
