// notifications.service.ts

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { envs } from 'src/config';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: envs.FIREBASE_PROJECT_ID,
        clientEmail: envs.FIREBASE_CLIENT_EMAIL,
        privateKey: envs.FIREBASE_PRIVATE_KEY,
    }),
});

@Injectable()
export class NotificationsService {


    async sendNotification(token: string, title: string, body: string) {
        const message = {
            token,
            notification: {
                title,
                body,
            },
            data: {
                customKey: 'customValue', // Datos adicionales que puedas necesitar
            },
        };

        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (error) {
            console.error('Error al enviar la notificación:', error);
            throw error;
        }
    }
}
