import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar un token de dispositivo' })
    @ApiBody({ type: CreateDeviceDto })
    @ApiResponse({ status: 201, description: 'Token registrado correctamente' })
    @ApiResponse({ status: 200, description: 'Token ya estaba registrado' })
    create(@Body() createDeviceDto: CreateDeviceDto) {
        return this.devicesService.create(createDeviceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los tokens de dispositivos' })
    @ApiResponse({ status: 200, description: 'Lista de tokens' })
    findAll() {
        return this.devicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un token por ID' })
    @ApiParam({ name: 'id', description: 'ID del token' })
    @ApiResponse({ status: 200, description: 'Token encontrado' })
    findOne(@Param('id') id: string) {
        return this.devicesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Desactivar un token por ID' })
    @ApiParam({ name: 'id', description: 'ID del token a desactivar' })
    @ApiResponse({ status: 200, description: 'Token desactivado' })
    update(@Param('id') id: string) {
        return this.devicesService.update(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un token por ID' })
    @ApiParam({ name: 'id', description: 'ID del token a eliminar' })
    @ApiResponse({ status: 200, description: 'Token eliminado' })
    remove(@Param('id') id: string) {
        return this.devicesService.remove(+id);
    }
}
