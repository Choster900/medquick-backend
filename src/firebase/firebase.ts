import * as admin from 'firebase-admin';
import { envs } from 'src/config';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: envs.FIREBASE_PROJECT_ID,
            clientEmail: envs.FIREBASE_CLIENT_EMAIL,
            privateKey: envs.FIREBASE_PRIVATE_KEY,
        }),
    });
}

export default admin;
