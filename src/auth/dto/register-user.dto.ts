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

export class RegisterUserDto {

    // TODO: Agregar los campos faltantes de otras tablas en el futuro

    @IsEnum(GenderList, {
        message: 'El género debe ser MALE o FEMALE',
    })
    userGender: Gender;

    @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
    @MinLength(1, { message: 'El primer nombre es obligatorio' })
    userFirstName: string;

    @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
    @MinLength(1, { message: 'El segundo nombre es obligatorio' })
    userSecondName: string;

    @IsString({ message: 'El tercer nombre debe ser una cadena de texto' })
    @IsOptional()
    userThirdName: string;

    @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
    @MinLength(1, { message: 'El primer apellido es obligatorio' })
    userFirstLastname: string;

    @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
    @MinLength(1, { message: 'El segundo apellido es obligatorio' })
    userSecondLastname: string;

    @IsString({ message: 'El tercer apellido debe ser una cadena de texto' })
    @IsOptional()
    @MinLength(1, { message: 'El tercer apellido no puede estar vacío si se proporciona' })
    userThirdLastname: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
    userEmail?: string;

    @IsOptional()
    @IsString()
    userDui?: string;

    @IsEmailOrDui({ message: 'Debe ingresar al menos un correo o un DUI' })
    dummyCheck: string; // propiedad ficticia solo para la validación cruzada

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



    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    userBirthdate: Date;

    @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
    userPhoneNumber: string;

    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @IsOptional()
    userAddress: string;

    // TODO Documentar esto para swagger
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    profilesId: number[];
}
