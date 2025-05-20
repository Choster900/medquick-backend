import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { Socket } from 'socket.io';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: user
    }
}

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {

    constructor(
        private readonly notificationsService: NotificationsService,
    ) {
        super();
    }

    private connectedClients: ConnectedClients = {}

    onModuleInit() {
        this.$connect();
    }


    async registerClient(client: Socket, userId: string) {

        const user = await this.user.findFirst({
            where: {
                user_id: userId
            }
        });


        if (!user) throw new Error('User not found');


        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }


    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }

    getUserFullName(socketId: string) {
        return this.connectedClients[socketId].user.user_first_name;
    }

    async saveMessage(from: string, to: string, message: string) {

        try {
            console.log({ from, to });

            // Buscar si el chat ya existe
            let chat = await this.chat.findFirst({
                where: {
                    OR: [
                        {
                            chat_user_id: from,
                            chat_doctor_id: to,
                        },
                        {
                            chat_user_id: to,
                            chat_doctor_id: from,
                        },
                    ],
                },
            });

            // console.log("Antes de guardar ", { chat, message });

            if (!chat) {
                chat = await this.chat.create({
                    data: {
                        chat_user_id: from,
                        chat_doctor_id: to,
                    },
                });
            }
            //console.log("Antes de guardar ", { chat, message });

            const savedMessage = await this.message.create({
                data: {
                    message_user_id: from,
                    message_chat_id: chat.chat_id,
                    message_content: message,
                    message_status_id: 1,
                },
            });

            const tokens = await this.user_devices.findMany({
                where: { user_id: to },
                select: {
                    user_devices_token: true,
                    user: {
                        select: {
                            user_first_name: true
                        }
                    }
                }
            });

            await Promise.all(tokens.map(({ user_devices_token, user }) =>
                this.notificationsService.sendNotification({
                    token: user_devices_token,
                    title: 'Mensaje de ' + user.user_first_name,
                    message: message,
                })
            ));


            return buildSuccessResponse(savedMessage, 'Chat guardado');

        } catch (error) {
            console.log(error);

            return buildErrorResponse(error.message, error.status, 500);
        }

    }

    async getAllChats(userId: string) {

        try {
            const chats = await this.chat.findMany({
                where: {
                    OR: [
                        { chat_user_id: userId },
                        { chat_doctor_id: userId },
                    ],
                },
                select: {
                    chat_id: true,
                    chat_user_id: true,
                    chat_user: {
                        select: {
                            user_id: true,
                            user_state_id: true,
                            user_gender: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                            user_address: true,
                        }
                    },
                    chat_doctor_id: true,
                    chat_doctor: {
                        select: {
                            user_id: true,
                            user_state_id: true,
                            user_gender: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_third_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_third_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                            user_address: true,
                        }
                    },
                    chat_updated_at: true,
                    message: {
                        orderBy: {
                            message_created_at: 'desc',
                        },
                        take: 1,
                        select: {
                            message_id: true,
                            message_content: true,
                            message_created_at: true,
                            message_file_type: true,
                            message_file_path: true,
                        },
                    },
                },
                orderBy: {
                    chat_updated_at: 'desc',
                },
            });

            const data = chats.map(chat => ({
                ...chat,
                message: chat.message[0] || null,
                messages: undefined,
            }));

            return buildSuccessResponse(data, 'Chats obtenidos');

        } catch (error) {
            return buildErrorResponse(error.message, error.status, 500);

        }

    }

    async getMessagesFromChat(chatId: number) {
        try {
            const messages = await this.message.findMany({
                where: {
                    message_chat_id: chatId,
                },
                select: {
                    message_id: true,
                    message_user_id: true,
                    message_content: true,
                    message_file_type: true,
                    message_file_path: true,
                    message_status_id: true,
                    message_created_at: true,
                    message_user: {
                        select: {
                            user_gender: true,
                            user_first_name: true,
                            user_second_name: true,
                            user_first_lastname: true,
                            user_second_lastname: true,
                            user_email: true,
                            user_phone_number: true,
                        }
                    }
                },
                orderBy: {
                    message_created_at: 'asc',
                },
            });


            return buildSuccessResponse(messages, 'Mensajes del chat obtenidos');
        } catch (error) {
            return buildErrorResponse(error.message, error.status, 500);
        }
    }






}
