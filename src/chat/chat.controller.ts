import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators';
import { CurrentUser } from 'src/common/interfaces/current-user.interface';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth('JWT-auth')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('get-chats')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtener todos los chats del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Lista de chats del usuario' })
    getChatsByUser(@User() user: CurrentUser) {
        return this.chatService.getAllChats(user.user_id);
    }

    @Get('get-chats/:chatId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtener los mensajes de un chat específico' })
    @ApiParam({ name: 'chatId', type: Number, description: 'ID del chat' })
    @ApiResponse({ status: 200, description: 'Mensajes del chat especificado' })
    getMessagesByChat(@Param('chatId') chatId: number, @User() user: CurrentUser) {
        return this.chatService.getMessagesFromChat(chatId);
    }
}
