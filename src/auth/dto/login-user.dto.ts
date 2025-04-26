import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiPropertyOptional({
        description: 'Correo electrónico del usuario (opcional, pero se requiere si no se proporciona el DUI)',
        example: 'usuario@example.com'
    })
    @IsEmail({}, { message: 'El correo no es válido' })
    @IsOptional()
    userEmail?: string;

    @ApiPropertyOptional({
        description: 'DUI del usuario (opcional, pero se requiere si no se proporciona el correo)',
        example: '12345678-9'
    })
    @IsString({ message: 'userDui debe ser un string' })
    @IsOptional()
    userDui?: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'MiContraseña123'
    })
    @IsString({ message: 'La contraseña es obligatoria' })
    userPassword: string;
}
