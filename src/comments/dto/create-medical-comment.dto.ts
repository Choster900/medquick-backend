import { IsString, IsNotEmpty, IsUUID, Length, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalCommentDto {
    @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: 'Comentario para el médico', minLength: 3, maxLength: 500 })
    @IsString()
    @IsNotEmpty()
    @Length(3, 500)
    medicalCommentComment: string;

    @ApiProperty({ description: 'Rating de 1 a 5', minimum: 1, maximum: 5 })
    @IsNumber()
    @IsNotEmpty()
    @IsIn([1, 2, 3, 4, 5], {
        message: 'El rating debe ser un valor entre 1 y 5 como number',
    })
    medicalCommentRating: number;
}
