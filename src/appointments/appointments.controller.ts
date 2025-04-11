import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

import { CreateAppointmentDto, FilterAppointmentStateDto, ScheduleAppointmentDto, UpdateAppointmentDto } from './dto';


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

    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }

    @Patch('schedule/:medicalAppointmentId')
    schedule(
        @Param('medicalAppointmentId') medicalAppointmentId: string,
        @Body() scheduleAppointmentDto: ScheduleAppointmentDto
    ) {
        return this.appointmentsService.schedule(medicalAppointmentId, scheduleAppointmentDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.appointmentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(+id, updateAppointmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.appointmentsService.remove(+id);
    }
}
