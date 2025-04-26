import { IsString, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInstitutionDto {

    @ApiProperty({
        description: 'Nombre completo de la institución',
        example: 'Instituto Nacional de Salud Pública',
        minLength: 3,
        maxLength: 50
    })
    @IsString({ message: 'El nombre de la institución debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la institución no puede estar vacío' })
    @Length(3, 50, { message: 'El nombre de la institución debe tener entre 3 y 50 caracteres' })
    institutionName: string;

    @ApiProperty({
        description: 'Acrónimo o siglas de la institución',
        example: 'INSP',
        minLength: 2,
        maxLength: 10
    })
    @IsString({ message: 'El acrónimo de la institución debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El acrónimo de la institución no puede estar vacío' })
    @Length(2, 10, { message: 'El acrónimo de la institución debe tener entre 2 y 10 caracteres' })
    institutionAcronym: string;

    @ApiProperty({
        description: 'Descripción general de la institución',
        example: 'Institución dedicada a la investigación en salud pública a nivel nacional.'
    })
    @IsString({ message: 'La descripción de la institución debe ser una cadena de texto' })
    institutionDescription: string;
}
