import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChatController } from './chat.controller';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
    providers: [ChatGateway, ChatService, NotificationsService],
    imports: [AuthModule],
    controllers: [ChatController]
})
export class ChatModule { }
