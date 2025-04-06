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

    @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
    @MinLength(1, { message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
    userEmail: string;

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

    @IsString({ message: 'El DUI debe ser una cadena de texto' })
    userDui: string;

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    userBirthdate: Date;

    @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
    userPhoneNumber: string;

    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @IsOptional()
    userAddress: string;
}
