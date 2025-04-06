import { IsEmail, IsString } from "class-validator";

// login-user-email.dto.ts
export class LoginUserByEmailDto {
    @IsEmail({}, { message: 'El correo no es válido' })
    userEmail: string;

    @IsString({ message: 'La contraseña es obligatoria' })
    userPassword: string;
  }
