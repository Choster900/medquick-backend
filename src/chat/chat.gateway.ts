import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly jwtService: JwtService
    ) { }

    async handleConnection(client: Socket) {

        const token = client.handshake.headers.authenticateionjwt as string

        let payload: JwtPayload

        try {

            payload = this.jwtService.verify(token)

            await this.chatService.registerClient(client, payload.userId)

        } catch (error) {
            client.disconnect()
            console.log("Error");

            return;
        }

        this.wss.emit('clients-updated', this.chatService.getConnectedClients());

    }

    handleDisconnect(client: Socket) {

        this.chatService.removeClient(client.id);

        this.wss.emit('clients-updated', this.chatService.getConnectedClients());
    }


    @SubscribeMessage('message-from-client')
    async onMessageFromClient(client: Socket, payload: NewMessageDto) {


        const decodeJwt = this.jwtService.decode(client.handshake.headers.authenticateionjwt as string) as JwtPayload
        console.log(decodeJwt);
        console.log(payload);

        await this.chatService.saveMessage(decodeJwt.userId, payload.to, payload.message)

        this.wss.emit('message-from-server', {
            fullName: this.chatService.getUserFullName(client.id),
            message: payload.message || 'no-message!!'
        });

    }

}
