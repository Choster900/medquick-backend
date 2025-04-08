import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreateInstitutionDto {

    @IsString({ message: 'El nombre de la institución debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la institución no puede estar vacío' })
    @Length(3, 50, { message: 'El nombre de la institución debe tener entre 3 y 50 caracteres' })
    institutionName: string;

    @IsString({ message: 'La descripción de la institución debe ser una cadena de texto' })
    institutionDescription: string;
}
