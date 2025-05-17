import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators';
import { CurrentUser } from 'src/common/interfaces/current-user.interface';
import { use } from 'passport';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }


    @Get('get-chats')
    @UseGuards(JwtAuthGuard)
    loginByEmail(@User() user: CurrentUser) {
        console.log(user);

        return this.chatService.getAllChats(user.user_id);
    }

}
