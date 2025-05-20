import { IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewMessageDto {
    @ApiProperty({ format: 'uuid', description: 'ID del usuario receptor' })
    @IsString()
    @IsUUID()
    to: string;

    @ApiProperty({ format: 'uuid', description: 'ID del usuario emisor' })
    @IsString()
    @IsUUID()
    from: string;

    @ApiProperty({ description: 'Contenido del mensaje', minLength: 1 })
    @IsString()
    @MinLength(1)
    message: string;
}
