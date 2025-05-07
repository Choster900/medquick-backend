// src/notifications/dto/create-notification.dto.ts
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsObject } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    token: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    message: string;

    @IsOptional()
    @IsObject()
    data?: Record<string, string>;  // Este campo es opcional y será un objeto con pares clave-valor
}
