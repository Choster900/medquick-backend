import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }



    @Post('send')
    send(@Body() body: { token: string; title: string; message: string }) {
        return this.notificationsService.sendNotification(body.token, body.title, body.message);
    }

}
