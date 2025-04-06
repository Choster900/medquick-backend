import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { RegisterUserDto } from './dto';
/**
 *
 *
 * @export
 * @class AuthService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 */
@Injectable()

export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('AuthService')

    onModuleInit() {
        this.$connect();
        this.logger.log('Database connected')
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        const {
            userEmail, userGender,
            userPhoneNumber, userAddress,
            userFirstName, userSecondName,
            userThirdName, userFirstLastname,
            userPassword, userDui, userBirthdate,
            userSecondLastname, userThirdLastname,
        } = registerUserDto

        try {

            const user = await this.user.findUnique({
                where: { user_email: userEmail }
            })

            if (user) {
                throw new InternalServerErrorException({
                    status: 400,
                    message: 'El correo del usuario ya esta registrado'
                })
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
                    user_password: userPassword,
                    user_dui: userDui,
                    user_birthdate: userBirthdate,
                    user_phone_number: userPhoneNumber,
                    user_address: userAddress
                }
            })

            return {
                user: newUser,
                token: 'Abc123Token'
            };

        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}
