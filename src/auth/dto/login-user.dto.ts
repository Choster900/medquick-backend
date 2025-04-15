import { IsEmail, IsOptional, IsString } from "class-validator";

// login-user-email.dto.ts
export class LoginUserDto {
    @IsEmail({}, { message: 'El correo no es válido' })
    @IsOptional()
    userEmail?: string;

    @IsString({ message: 'userDuiDebe de ser un string' })
    @IsOptional()
    userDui?: string;

    @IsString({ message: 'La contraseña es obligatoria' })
    userPassword: string;
}
