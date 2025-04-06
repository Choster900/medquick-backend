import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }


}
