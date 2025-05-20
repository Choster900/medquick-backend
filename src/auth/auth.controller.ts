import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'El usuario fue registrado correctamente', type: User })
    @ApiResponse({ status: 400, description: 'Datos inválidos o errores de validación' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    @ApiBody({ type: RegisterUserDto })
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión con correo o DUI' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    @ApiBody({ type: LoginUserDto })
    loginByEmail(@Body() loginByEmailDto: LoginUserDto) {
        return this.authService.loginUser(loginByEmailDto);
    }

    @Get('private-route')
    @ApiOperation({ summary: 'Ruta privada de prueba protegida por JWT' })
    @ApiResponse({ status: 200, description: 'Acceso autorizado' })
    @ApiResponse({ status: 401, description: 'No autorizado, JWT inválido o ausente' })
    @UseGuards(AuthGuard('jwt'))
    testingPrivateRoute() {
        return {
            ok: true,
            message: 'Estás dentro de la ruta protegida',
        };
    }
}
