import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, ParseUUIDPipe, BadRequestException, UseInterceptors, UploadedFile, Headers, UploadedFiles } from '@nestjs/common';

import { Roles, User } from 'src/common/decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/interfaces/current-user.interface';
import { CreateAppointmentDto, ScheduleAppointmentDto, UpdateAppointmentDto, FindAppointmentsDto, CancelAppointmentDto } from './dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/exams/helpers';
import { diskStorage } from 'multer';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Post()
    @Roles('PACIENTE')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FilesInterceptor('files', 10, {
        fileFilter,
        storage: diskStorage({
            destination: './static/exams',
            filename: fileNamer,
        }),
    }))
    @ApiOperation({ summary: 'Crear cita médica con archivos de exámenes y comentarios' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Crear cita médica con archivos de exámenes y comentarios',
        schema: {
            type: 'object',
            properties: {
                branchId: { type: 'string', format: 'uuid' },
                medicalProcedureId: { type: 'string', format: 'uuid' },
                nonRegisteredPatientId: { type: 'number', nullable: true },
                comments: {
                    type: 'array',
                    items: { type: 'string' },
                },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() createAppointmentDto: CreateAppointmentDto,
        @User() user: CurrentUser,
    ) {
        const combined = files.map((file, index) => ({
            file,
            comment: createAppointmentDto.comments?.[index] || null,
        }));
        return this.appointmentsService.create(createAppointmentDto, user.user_id, combined);
    }

    @Get('status/:medicalAppointmentState')
    @ApiOperation({ summary: 'Obtener citas por estado' })
    @ApiParam({ name: 'medicalAppointmentState', type: Number, description: 'Estado de la cita médica' })
    findAllByStatus(
        @Param('medicalAppointmentState', ParseIntPipe) medicalAppointmentState: number
    ) {
        return this.appointmentsService.findAllByStatus(medicalAppointmentState);
    }

    @Get('filter')
    @ApiOperation({ summary: 'Filtrar citas por usuario, sucursal, doctor o institución' })
    @ApiQuery({ name: 'userId', required: false, description: 'Si es true, retornara las citas por usuario' })
    @ApiQuery({ name: 'branchId', required: false, description: 'Si es true, retornara las citas por sucursal' })
    @ApiQuery({ name: 'doctorUserId', required: false, description: 'Si es true, retornara las citas por medicos' })
    @ApiQuery({ name: 'institutionId', required: false, description: 'Si es true, retornara las citas por institucion' })
    @ApiQuery({ name: 'all', required: false, description: 'Si es true, retornara todas las citas' })
    @UseGuards(JwtAuthGuard)
    async findAppointments(@Query() query: FindAppointmentsDto) {
        const { userId, branchId, doctorUserId, institutionId, all } = query;

        if (all === 'true') {
            return this.appointmentsService.findAll('all');
        }
        if (userId) {
            return this.appointmentsService.findAll('userId', userId);
        }
        if (branchId) {
            return this.appointmentsService.findAll('branchId', branchId);
        }
        if (doctorUserId) {
            return this.appointmentsService.findAll('doctorUserId', doctorUserId);
        }
        if (institutionId) {
            return this.appointmentsService.findAll('institutionId', institutionId);
        }

        throw new BadRequestException(
            'Debe proporcionar al menos un parámetro de filtro: [all=true, userId, branchId, doctorUserId, institutionId]',
        );
    }



    @Patch('schedule/:medicalAppointmentId')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Agendar cita médica existente' })
    @ApiParam({ name: 'medicalAppointmentId', type: 'string', format: 'uuid' })
    @ApiBody({ type: ScheduleAppointmentDto })
    schedule(
        @Param('medicalAppointmentId') medicalAppointmentId: string,
        @Body() scheduleAppointmentDto: ScheduleAppointmentDto,
        @User() user: CurrentUser,
    ) {

        return this.appointmentsService.schedule(medicalAppointmentId, scheduleAppointmentDto, user.user_id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalles de una cita por ID' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.appointmentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar datos de una cita' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ type: UpdateAppointmentDto })
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(+id, updateAppointmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Cancelar una cita' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiBody({ type: CancelAppointmentDto })
    remove(@Param('id', ParseUUIDPipe) id: string, @Body() cancelAppointmentDto: CancelAppointmentDto) {
        return this.appointmentsService.remove(id, cancelAppointmentDto);
    }

}
