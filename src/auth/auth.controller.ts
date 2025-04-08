import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { LoginUserByEmailDto } from './dto/login-user-email.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('login-by-email')
    loginByEmail(@Body() loginByEmailDto: LoginUserByEmailDto) {
        return this.authService.loginUserEmail(loginByEmailDto);
    }

    @Get('private-route')
    @UseGuards(AuthGuard('jwt')) // usa 'jwt' explícitamente
    testingPrivateRoute() {


        return {
            ok: true,
            message: "estas dentro de la ruta"
        }
    }

}
