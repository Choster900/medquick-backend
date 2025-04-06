import { IsString } from "class-validator";

// login-user-dui.dto.ts
export class LoginUserByDuiDto {
    @IsString({ message: 'El DUI es obligatorio' })
    userDui: string;

    @IsString({ message: 'La contraseña es obligatoria' })
    userPassword: string;
}
