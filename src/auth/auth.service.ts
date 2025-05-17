import {
    Injectable,
    OnModuleInit,
    HttpException,
    ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

import { LoginUserDto, RegisterUserDto } from './dto';
import { Profiles } from './interfaces/profiles.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { buildErrorResponse } from 'src/common/helpers/error-response';
import { buildSuccessResponse } from 'src/common/helpers/success-response';
import { EmailService } from 'src/common/services/email/email.service';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {
        super();
    }

    onModuleInit() {
        this.$connect();
    }

    async registerUser(registerUserDto: RegisterUserDto) {
        const {
            userPhoneNumber, userAddress,
            userFirstName, userSecondName,
            userThirdName, userFirstLastname,
            userEmail, userGender,
            userPassword, userDui, userBirthdate,
            userSecondLastname, userThirdLastname,
            profilesId
        } = registerUserDto;

        try {
            if (userEmail) {
                const existingUser = await this.user.findUnique({
                    where: { user_email: userEmail },
                });

                if (existingUser) {
                    throw new ConflictException('El correo del usuario ya está registrado');
                }
            }

            if (userDui) {
                const existingDui = await this.user.findUnique({
                    where: { user_dui: userDui },
                });

                if (existingDui) {
                    throw new ConflictException('El DUI del usuario ya está registrado');
                }
            }

            const profiles = await this.security_profile.findMany({
                where: {
                    security_profile_id: {
                        in: profilesId,
                    },
                },
            });

            if (profiles.length !== profilesId.length) {
                throw new Error('Uno o más perfiles no existen');
            }

            const newUser = await this.user.create({
                data: {
                    user_state_id: 1,
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
                    auth_user_profile: {
                        create: profiles.map(profile => ({
                            security_profile_id: profile.security_profile_id,
                        })),
                    },
                },
                include: {
                    auth_user_profile: {
                        include: {
                            security_profile: true,
                        },
                    },
                },
            });

            const profilesData = newUser.auth_user_profile.map((profile) => ({
                profileName: profile.security_profile.security_profile_profile_name,

            }));

            const jwtPayload = {
                userEmail: newUser.user_email,
                userProfiles: profilesData,
                userId: newUser.user_id,
            };

            if (userEmail) {
                await this.emailService.sendWelcomeEmail(userEmail);
            }
            
            return buildSuccessResponse({
                user: newUser,
                token: this.getJwtToken(jwtPayload),
            });
        } catch (error) {

            if (error instanceof HttpException) throw error;
            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }

    async loginUser(loginByEmailDto: LoginUserDto) {
        const { userEmail, userPassword, userDui } = loginByEmailDto;

        try {

            const user = await this.user.findFirst({
                where: {
                    OR: [
                        { user_email: userEmail || undefined },
                        { user_dui: userDui || undefined },
                    ],
                },
                include: {
                    auth_user_profile: {
                        include: {
                            security_profile: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const isPasswordValid = bcrypt.compareSync(userPassword, user.user_password);
            if (!isPasswordValid) {
                throw new Error('La contraseña es incorrecta');
            }

            const profiles: Profiles[] = user.auth_user_profile.map((profile) => ({
                profileName: profile.security_profile.security_profile_profile_name,

            }));

            const { user_password: _, auth_user_profile: ___, ...userWithoutPassword } = user;

            const jwtPayload = {
                userEmail: user.user_email,
                userProfiles: profiles,
                userId: user.user_id,
            };

            return {
                user: userWithoutPassword,
                token: this.getJwtToken(jwtPayload),
            };
        } catch (error) {

            return buildErrorResponse(
                error.message || 'Error interno del servidor',
                error.status
            );
        }
    }


    private getJwtToken(payload: JwtPayload) {

        const token = this.jwtService.sign(payload)

        return token

    }
}
