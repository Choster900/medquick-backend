import { IsString, IsNotEmpty, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchCommentDto {
    @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: 'Comentario del usuario para la sucursal' })
    @IsString()
    @IsNotEmpty()
    branchCommentComment: string;

    @ApiProperty({ description: 'Rating de 1 a 5', minimum: 1, maximum: 5 })
    @IsNumber()
    @IsNotEmpty()
    @IsIn([1, 2, 3, 4, 5], {
        message: 'El rating debe ser un valor entre 1 y 5 como number',
    })
    branchCommentRating: number;
}
