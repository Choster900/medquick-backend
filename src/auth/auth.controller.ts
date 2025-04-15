import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: User })
    @ApiResponse({ status: 400, description: 'Bad Request: Validation errors or invalid data.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong.' })
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('login')
    loginByEmail(@Body() loginByEmailDto: LoginUserDto) {
        return this.authService.loginUser(loginByEmailDto);
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
