import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

    @Post('loginByEmail')
    loginByEmail(@Body() loginByEmailDto: LoginUserByEmailDto) {
        return this.authService.loginUserEmail(loginByEmailDto);
    }

}
