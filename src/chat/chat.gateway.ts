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
        this.enviarUsuariosConectados();
    }

    private enviarUsuariosConectados(): void {
        const usuarios = this.chatService.getConnectedClients();
        this.wss.emit('usuarios-actualizados', usuarios);
    }

    // === Eventos personalizados ===

    @SubscribeMessage('unirse-a-sala')
    handleJoinRoom(client: Socket, salaId: string): void {
        client.join(salaId);
        console.log(`Cliente ${client.id} se unió a la sala: ${salaId}`);
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
            };

            // Emitir al receptor
            this.wss.to(payload.to).emit('mensaje-desde-servidor', mensaje);

            // Emitir al emisor también
            client.emit('mensaje-desde-servidor', mensaje);

        } catch (error) {
            console.error('Error al manejar el mensaje:', error);
        }
    }
}
