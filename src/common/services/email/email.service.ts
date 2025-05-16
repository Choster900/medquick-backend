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

    sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = "Sistema Medquick - Registro de usuario"

        const htmlBody =
            `
           <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Agéndate sv</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .container {
          text-align: center;
          background: radial-gradient(circle at center, #1B4DD9, #1B2A66);
          padding: 30px;
          border-radius: 20px;
          color: white;
          max-width: 65%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin: 0 auto;
          position: relative;
          top: 30%;
        }
        h1 { font-size: 2.5em; margin-bottom: 20px; }
        p { font-size: 1.2em; margin-bottom: 20px; text-align: justify; }
        .download-btn {
          background-color: #13C296;
          color: white !important;
          border: none;
          padding: 10px 20px;
          font-size: 1em;
          cursor: pointer;
          border-radius: 5px;
          text-decoration: none;
          display: inline-block;
        }
        .download-btn:hover {
          background-color: #2e8b3d;
        }
      </style>
    </head>
    <body style="margin:0;padding:0;width:100%;height:100%;background-color:white;">
      <div class="container">
        <div class="header">
          <img src="URL_DEL_CONSULTA" alt="consulta SV Logo" style="width:200px;height:80px;">
          <img src="URL_DEL_SIS" alt="SIS SV Logo" style="width:200px;height:80px;">
        </div>
        <div class="article">
          <p>Te informamos que tu cuenta ha sido creada en Medquick, a continuación, encontrarás la contraseña temporal que te permitirá acceder a tu cuenta por primera vez:</p>
          <p>Contraseña temporal: CONTRASENA_TEMPORAL</p>
          <p>Abre tu applicacion y utiliza la contraseña temporal para iniciar sesión</p>
        </div>
        <br>
        <div>
          <img src="URL_DEL_GOES" alt="goes SV Logo" style="width:200px;height:80px;">
        </div>
      </div>
    </body>
    </html>

        `

        const attachments = [
            /* {
                filename: 'logs-all.log',
                path: './logs/logs-all.log',
            }, */
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
        ]

        return this.sendEmail({
            to,
            subject,
            body: htmlBody,
            //attachments,
        })
    }
}
