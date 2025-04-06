import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
    OnModuleInit,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { LoginUserByEmailDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('AuthService');

    onModuleInit() {
        this.$connect();
        this.logger.log('Database connected');
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        const {
            userEmail, userGender,
            userPhoneNumber, userAddress,
            userFirstName, userSecondName,
            userThirdName, userFirstLastname,
            userPassword, userDui, userBirthdate,
            userSecondLastname, userThirdLastname,
        } = registerUserDto;

        try {
            const existingUser = await this.user.findUnique({
                where: { user_email: userEmail }
            });

            if (existingUser) {
                throw new ConflictException('El correo del usuario ya está registrado');
            }

            const newUser = await this.user.create({
                data: {
                    user_gender: userGender,
                    user_first_name: userFirstName,
                    user_second_name: userSecondName,
                    user_third_name: userThirdName,
                    user_first_lastname: userFirstLastname,
                    user_second_lastname: userSecondLastname,
                    user_third_lastname: userThirdLastname,
                    user_email: userEmail,
                    user_password: bcrypt.hashSync(userPassword, 10),
                    user_dui: userDui,
                    user_birthdate: userBirthdate,
                    user_phone_number: userPhoneNumber,
                    user_address: userAddress,
                },
            });

            return {
                user: newUser,
                token: 'Abc123Token',
            };

        } catch (error) {
            this.logger.error('Error en registerUser', error);
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException('Error interno del servidor');
        }
    }

    async loginUserEmail(loginByEmailDto: LoginUserByEmailDto) {
        const { userEmail, userPassword } = loginByEmailDto;

        try {
            const user = await this.user.findUnique({
                where: { user_email: userEmail }
            });

            if (!user) {
                throw new ForbiddenException('El correo no existe');
            }

            const isPasswordValid = bcrypt.compareSync(userPassword, user.user_password);

            if (!isPasswordValid) {
                throw new ForbiddenException('La contraseña es incorrecta');
            }

            const { user_password: ___, ...rest } = user;

            return {
                user: rest,
                token: 'Abc123Token',
            };

        } catch (error) {
            this.logger.error('Error en loginUserEmail', error);
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException('Error interno del servidor');
        }
    }
}
