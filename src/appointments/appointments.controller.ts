import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, ParseUUIDPipe, BadRequestException } from '@nestjs/common';

import { Roles, User } from 'src/common/decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/interfaces/current-user.interface';
import { CreateAppointmentDto, ScheduleAppointmentDto, UpdateAppointmentDto, FindAppointmentsDto, CancelAppointmentDto } from './dto';


@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.create(createAppointmentDto);
    }

    @Get('status/:medicalAppointmentState')
    findAllByStatus(
        @Param('medicalAppointmentState', ParseIntPipe) medicalAppointmentState: number
    ) {
        return this.appointmentsService.findAllByStatus(medicalAppointmentState);
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    async findAppointments(@Query() query: FindAppointmentsDto) {

        const { userId, branchId, doctorUserId, institutionId } = query;

        if (userId) return this.appointmentsService.findAll('userId', userId);
        if (branchId) return this.appointmentsService.findAll('branchId', branchId);
        if (doctorUserId) return this.appointmentsService.findAll('doctorUserId', doctorUserId);
        if (institutionId) return this.appointmentsService.findAll('institutionId', institutionId);

        throw new BadRequestException('Debe proporcionar al menos un parámetro de filtro [userId,branchId,doctorUserId,institutionId]');
    }

    @Patch('schedule/:medicalAppointmentId')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    schedule(
        @Param('medicalAppointmentId') medicalAppointmentId: string,
        @Body() scheduleAppointmentDto: ScheduleAppointmentDto,
        @User() user: CurrentUser,
    ) {

        return this.appointmentsService.schedule(medicalAppointmentId, scheduleAppointmentDto, user.user_id);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.appointmentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(+id, updateAppointmentDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string, @Body() cancelAppointmentDto: CancelAppointmentDto) {
        return this.appointmentsService.remove(id, cancelAppointmentDto);
    }

}
