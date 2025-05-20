import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
    @ApiProperty({
        description: 'UUID del usuario propietario del dispositivo',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
    })
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'Token del dispositivo para notificaciones push',
        example: 'fcm_token_abcdefg123456',
    })
    @IsString()
    @IsNotEmpty()
    userDevicesToken: string;

    @ApiProperty({
        description: 'Tipo de dispositivo (ej. android, ios, web)',
        example: 'android',
    })
    @IsString()
    userDevicesType: string;
}
