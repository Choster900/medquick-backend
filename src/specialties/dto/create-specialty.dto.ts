import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialtyDto {

    @ApiProperty({
        description: 'Nombre de la especialidad médica',
        example: 'Pediatría',
    })
    @IsNotEmpty({ message: 'El nombre de la especialidad no puede estar vacío' })
    @IsString({ message: 'El nombre de la especialidad debe ser una cadena de texto' })
    specialtyName: string;

    @ApiProperty({
        description: 'Descripción opcional de la especialidad',
        example: 'Especialidad médica que trata enfermedades infantiles',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    specialtyDescription?: string;
}
