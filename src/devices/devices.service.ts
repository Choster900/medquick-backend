import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDeviceDto } from './dto/create-device.dto';
import { buildErrorResponse, buildSuccessResponse } from 'src/common/helpers';

@Injectable()
export class DevicesService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        this.$connect();
    }

    /**
     * Guarda un token de dispositivo para un usuario.
     * Si el token ya existe, retorna el existente.
     */
    async create(createDeviceDto: CreateDeviceDto) {
        try {
            const { userId, userDevicesToken, userDevicesType } = createDeviceDto;

            // Validar que el usuario exista
            const userExists = await this.user.findUnique({
                where: { user_id: userId },
            });

            if (!userExists) {
                return buildErrorResponse('El usuario no existe', 404);
            }

            // Validar si el token ya está registrado
            const existing = await this.user_devices.findFirst({
                where: { user_devices_token: userDevicesToken },
            });

            if (existing) {
                return buildSuccessResponse(existing, 'Token ya estaba registrado');
            }

            // Crear nuevo token
            const newToken = await this.user_devices.create({
                data: {
                    user_id: userId,
                    user_devices_token: userDevicesToken,
                    user_devices_type: userDevicesType,
                    user_devices_is_active: true,
                },
            });

            return buildSuccessResponse(newToken, 'Token guardado correctamente');

        } catch (error) {
            return buildErrorResponse(error);
        }
    }


    /**
     * Devuelve todos los tokens de dispositivos.
     */
    async findAll() {
        try {
            const devices = await this.user_devices.findMany();
            return buildSuccessResponse(devices, 'Tokens obtenidos correctamente');
        } catch (error) {
            return buildErrorResponse(error);
        }
    }

    /**
     * Devuelve un token específico por su ID.
     */
    async findOne(id: number) {
        try {
            const device = await this.user_devices.findUnique({
                where: { user_devices_id: id },
            });

            return buildSuccessResponse(device, 'Token obtenido');
        } catch (error) {
            return buildErrorResponse(error);
        }
    }

    /**
     * Desactiva un token por su ID.
     */
    async update(id: number) {
        try {
            const updated = await this.user_devices.update({
                where: { user_devices_id: id },
                data: { user_devices_is_active: false },
            });

            return buildSuccessResponse(updated, 'Token desactivado');
        } catch (error) {
            return buildErrorResponse(error);
        }
    }

    /**
     * Elimina un token por su ID.
     */
    async remove(id: number) {
        try {
            const deleted = await this.user_devices.delete({
                where: { user_devices_id: id },
            });

            return buildSuccessResponse(deleted, 'Token eliminado');
        } catch (error) {
            return buildErrorResponse(error);
        }
    }
}
