import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { envs } from 'src/config';

@Injectable()
export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, body, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: body,
                attachments: attachments
            })
            console.log(sentInformation);

            return true;

        } catch (error) {

            return false;
        }
    }

    sendWelcomeEmail(to: string | string[]) {
        const subject = "Bienvenido a MedQuick - Tu cuenta ha sido creada";

        const htmlBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido a MedQuick</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f6f9;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header img {
                width: 180px;
            }
            h1 {
                color: #1B4DD9;
                font-size: 24px;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: #888;
            }
            .cta-btn {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 25px;
                background-color: #1B4DD9;
                color:rgb(255, 255, 255);
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }
            .cta-btn:hover {
                background-color: #1B4DD9;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://i.ibb.co/FdQJZvn/Logo-Completo-white.png" alt="MedQuick Logo">
            </div>
            <h1>¡Bienvenido a MedQuick!</h1>
            <p>Nos alegra tenerte en nuestra plataforma. Tu cuenta ha sido creada exitosamente y ahora formas parte de una comunidad que apuesta por la innovación y la salud digital.</p>
            <p>Ya puedes iniciar sesión con tus credenciales registradas. Si necesitas ayuda, nuestro equipo de soporte está disponible para asistirte.</p>
            <div class="footer">
                © ${new Date().getFullYear()} MedQuick. Todos los derechos reservados.
            </div>
        </div>
    </body>
    </html>
    `;

        return this.sendEmail({
            to,
            subject,
            body: htmlBody,
            //attachments,
        });
    }

    sendAppointmentConfirmationEmail(to: string | string[], appointmentDateISO: string) {
        const subject = "Confirmación de cita en MedQuick";

        // Convertir ISO string a objeto Date
        const appointmentDate = new Date(appointmentDateISO);

        // Formatear la fecha de forma bonita en español
        const formattedDate = new Intl.DateTimeFormat('es-SV', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'America/El_Salvador', // Ajusta si tu servidor está en otra zona
        }).format(appointmentDate);

        const htmlBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Cita Programada</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f6f9;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header img {
                width: 180px;
            }
            h1 {
                color: #1B4DD9;
                font-size: 24px;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
            }
            .highlight {
                font-weight: bold;
                color: #1B4DD9;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://i.ibb.co/FdQJZvn/Logo-Completo-white.png" alt="MedQuick Logo">
            </div>
            <h1>Tu cita ha sido programada</h1>
            <p>Nos complace informarte que tu cita ha sido agendada exitosamente en <strong>MedQuick</strong>.</p>
            <p><span class="highlight">📅 Fecha y hora:</span><br>${formattedDate}</p>
            <p>Por favor, intenta estar puntual para aprovechar al máximo tu consulta.</p>
            <p>Si necesitas reprogramarla o cancelarla, puedes hacerlo desde la plataforma.</p>
            <div class="footer">
                © ${new Date().getFullYear()} MedQuick. Todos los derechos reservados.
            </div>
        </div>
    </body>
    </html>
    `;

        return this.sendEmail({
            to,
            subject,
            body: htmlBody,
        });
    }



}
