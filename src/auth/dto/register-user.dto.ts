import {
    IsDate,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from "@nestjs/class-validator";
import { GenderList } from '../enum/gender.enum';
import { Gender } from "@prisma/client";
import { ArrayNotEmpty, IsArray, IsInt, IsNumber, Min } from "class-validator";
import { IsEmailOrDui } from "../validators/email-or-dui-required.validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {

    // TODO: Agregar los campos faltantes de otras tablas en el futuro

    @ApiProperty({ enum: GenderList, description: 'Género del usuario (MALE o FEMALE)' })
    @IsEnum(GenderList, {
        message: 'El género debe ser MALE o FEMALE',
    })
    userGender: Gender;

    @ApiProperty({ description: 'Primer nombre del usuario' })
    @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
    @MinLength(1, { message: 'El primer nombre es obligatorio' })
    userFirstName: string;

    @ApiProperty({ description: 'Segundo nombre del usuario' })
    @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
    @MinLength(1, { message: 'El segundo nombre es obligatorio' })
    userSecondName: string;

    @ApiProperty({ required: false, description: 'Tercer nombre del usuario (opcional)' })
    @IsString({ message: 'El tercer nombre debe ser una cadena de texto' })
    @IsOptional()
    userThirdName: string;

    @ApiProperty({ description: 'Primer apellido del usuario' })
    @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
    @MinLength(1, { message: 'El primer apellido es obligatorio' })
    userFirstLastname: string;

    @ApiProperty({ description: 'Segundo apellido del usuario' })
    @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
    @MinLength(1, { message: 'El segundo apellido es obligatorio' })
    userSecondLastname: string;

    @ApiProperty({ required: false, description: 'Tercer apellido del usuario (opcional)' })
    @IsString({ message: 'El tercer apellido debe ser una cadena de texto' })
    @IsOptional()
    @MinLength(1, { message: 'El tercer apellido no puede estar vacío si se proporciona' })
    userThirdLastname: string;

    @ApiProperty({ required: false, description: 'Correo electrónico del usuario (opcional)' })
    @IsOptional()
    @IsString()
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
    userEmail?: string;

    @ApiProperty({ required: false, description: 'DUI del usuario (opcional)' })
    @IsOptional()
    @IsString()
    userDui?: string;

    @ApiProperty({ description: 'Campo ficticio para validación cruzada de Email o DUI' })
    @IsEmailOrDui({ message: 'Debe ingresar al menos un correo o un DUI' })
    dummyCheck: string; // propiedad ficticia solo para la validación cruzada

    @ApiProperty({ description: 'Contraseña del usuario. Debe tener al menos una letra mayúscula, una minúscula y un número' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(50, { message: 'La contraseña no debe superar los 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número'
        }
    )
    userPassword: string;


    @ApiProperty({ description: 'Fecha de nacimiento del usuario (Formato ISO 8601)' })
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    userBirthdate: Date;

    @ApiProperty({ description: 'Número de teléfono del usuario' })
    @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
    userPhoneNumber: string;

    @ApiProperty({ required: false, description: 'Dirección del usuario (opcional)' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @IsOptional()
    userAddress: string;

    @ApiProperty({ type: [Number], description: 'IDs de los perfiles que el usuario debe tener' })
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    profilesId: number[];
}
