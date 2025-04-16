import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

    const logger = new Logger('MainApp', { timestamp: true });


    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            prefix: 'Backend', // Default is "Nest"
        }),

    });

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('MedQuick Doc')
        .setVersion('1.0')
        .addSecurity('basic', {
            type: 'http',
            scheme: 'basic',
        })
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
        ).build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/doc', app, documentFactory);

    await app.listen(envs.PORT);



    logger.log("Running on port: " + envs.PORT)
}
bootstrap();
