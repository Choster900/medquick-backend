import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { Socket } from 'socket.io';

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


    async registerClient(client: Socket, userEmail: string) {

        const user = await this.user.findFirst({
            where: {
                user_email: userEmail
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

}
