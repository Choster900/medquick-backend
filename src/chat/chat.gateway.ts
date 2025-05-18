import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import { ChatService } from './chat.service';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({
    cors: {
        origin: '*', // o especifica tu frontend exacto
        methods: ['GET', 'POST'],
        credentials: true,
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly jwtService: JwtService
    ) { }

    // === Conexión y desconexión ===

    async handleConnection(client: Socket): Promise<void> {
        const token = client.handshake.query.token as string
            || client.handshake.headers.authenticateionjwt as string;
        try {
            const payload = this.jwtService.verify<JwtPayload>(token);
            await this.chatService.registerClient(client, payload.userId);
            this.enviarUsuariosConectados();
        } catch (error) {
            client.disconnect();
            console.error("Token JWT inválido. Cliente desconectado.");
        }
    }

    handleDisconnect(client: Socket): void {
        this.chatService.removeClient(client.id);
        console.log(`Cliente ${client.id} se desconecto`);
        this.enviarUsuariosConectados();
    }

    private enviarUsuariosConectados(): void {
        const usuarios = this.chatService.getConnectedClients();
        this.wss.emit('usuarios-actualizados', usuarios);
    }
    // === Eventos personalizados ===

    /* @SubscribeMessage('unirse-a-sala')
    handleJoinRoom(client: Socket, salaId: string): void {
        client.join(salaId);
        console.log(`Cliente ${client.id} se unió a la sala: ${salaId}`);
    } */
    private generarChatId(usuarioA: string, usuarioB: string): string {
        return ['chat', ...[usuarioA, usuarioB].sort()].join(':'); // Ej: chat:123:456
    }


    /* @SubscribeMessage('unirse-a-sala')
    handleJoinRoom(client: Socket, otherUserId: string): void {
        const token = client.handshake.query.token as string
            || client.handshake.headers.authenticateionjwt as string;

        const datosJwt = this.jwtService.decode(token) as JwtPayload;
        const chatRoomId = this.generarChatId(datosJwt.userId, otherUserId);

        client.join(chatRoomId);
        console.log(`Cliente ${client.id} se unió a la sala: ${chatRoomId}`);
    } */

    @SubscribeMessage('unirse-a-chat')
    handleJoinChat(client: Socket, payload: { withUserId: string, myUserId: string }) {
        const chatRoom = this.generarChatId(payload.withUserId, payload.myUserId);
        client.join(chatRoom);

        console.log(`Cliente ${client.id} se unió a la sala: ${chatRoom}`);
    }

    @SubscribeMessage('mensaje-desde-cliente')
    async onMessageFromClient(client: Socket, payload: NewMessageDto): Promise<void> {
        try {
            const token = client.handshake.query.token as string
                || client.handshake.headers.authenticateionjwt as string;
            const datosJwt = this.jwtService.decode(token) as JwtPayload;

            if (!datosJwt || !datosJwt.userId) {
                throw new Error('JWT inválido');
            }

            await this.chatService.saveMessage(datosJwt.userId, payload.to, payload.message);

            const mensaje = {
                fullName: this.chatService.getUserFullName(client.id),
                message: payload.message || '¡Mensaje vacío!',
                from: datosJwt.userId,
                to: payload.to,
            };



            const chatRoomId = this.generarChatId(datosJwt.userId, payload.to);

         /*    console.log(mensaje); */
         /*    console.log(chatRoomId); */



            // Emitir en la sala del chat
            this.wss.to(chatRoomId).emit('mensaje-desde-servidor', mensaje);

        } catch (error) {
            console.error('Error al manejar el mensaje:', error);
        }
    }



}
