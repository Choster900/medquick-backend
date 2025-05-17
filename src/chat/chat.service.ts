import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { Socket } from 'socket.io';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: user
    }
}

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {

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
        // Buscar si el chat ya existe
        let chat = await this.chat.findFirst({
            where: {
                chat_user_id: from,
                chat_doctor_id: to,
            },
        });

        if (!chat) {
            chat = await this.chat.create({
                data: {
                    chat_user_id: from,
                    chat_doctor_id: to,
                },
            });
        }

        const savedMessage = await this.message.create({
            data: {
                message_user_id: from,
                message_chat_id: chat.chat_id,
                message_content: message,
                message_status_id: 1,
            },
        });

        return {
            success: true,
            message: 'Mensaje guardado exitosamente',
            data: savedMessage,
        };
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
                    chat_doctor_id: true,
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





}
