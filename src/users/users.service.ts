import { auth_user_profile, security_permiso_profile } from './../../node_modules/.prisma/client/index.d';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
        this.$connect()
    }

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAll() {

        try {

            const doctors = await this.user.findMany({
                select: {
                    user_id: true,
                    user_gender: true,
                    user_first_name: true,
                    user_second_name: true,
                    user_third_name: true,
                    user_first_lastname: true,
                    user_second_lastname: true,
                    user_third_lastname: true,
                    user_email: true,
                    user_dui: true,
                    user_birthdate: true,
                    user_phone_number: true,
                    user_address: true,
                    user_state: {
                        select: {
                            user_state_id: true,
                            user_state_name: true,
                            user_state_description: true
                        }
                    },
                    auth_user_profile: {
                        select: {
                            security_profile: {
                                select: {
                                    security_profile_profile_name: true,
                                    security_profile_profile_description: true
                                }
                            }
                        }
                    }
                },
                where: {
                    auth_user_profile: {
                        some: {
                            security_profile_id: 3
                        }
                    }
                },
            });

            return buildSuccessResponse(doctors, "Doctores disponibles")
        } catch (error) {
            return buildErrorResponse("Internal server error", error)
        }
    }

    findOne(id: string) {
        return this.user.findFirst({
            select: {
                user_id: true,
                user_gender: true,
                user_first_name: true,
                user_second_name: true,
                user_third_name: true,
                user_first_lastname: true,
                user_second_lastname: true,
                user_third_lastname: true,
                user_email: true,
                user_dui: true,
                user_birthdate: true,
                user_phone_number: true,
                user_address: true,
                user_state: {
                    select: {
                        user_state_id: true,
                        user_state_name: true,
                        user_state_description: true
                    }
                },
                auth_user_profile: {
                    select: {
                        security_profile: {
                            select: {
                                security_profile_profile_name: true,
                                security_profile_profile_description: true
                            }
                        }
                    }
                }
            },
            where: {
                user_id: id
            },
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
