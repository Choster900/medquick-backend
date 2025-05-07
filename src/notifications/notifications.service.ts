// notifications.service.ts
import { Injectable, Logger } from '@nestjs/common';
import admin from 'src/firebase/firebase';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    async sendNotification(
        token: string,
        title: string,
        body: string,
        data: Record<string, string> = {}
    ) {
        if (!token || !title || !body) {
            throw new Error('Faltan datos para enviar la notificación');
        }

        const message = {
            token,
            notification: { title, body },
            data,
        };

        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (error) {
            this.logger.error('Error al enviar la notificación', error.stack);
            throw error;
        }
    }
}
