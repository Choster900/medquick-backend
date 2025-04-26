import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Specialties')
@Controller('specialties')
export class SpecialtiesController {
    constructor(private readonly specialtiesService: SpecialtiesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva especialidad' })
    @ApiBody({ type: CreateSpecialtyDto })
    create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
        return this.specialtiesService.create(createSpecialtyDto);
    }

    @Post(':userId/specialties/:specialtyId')
    @ApiOperation({ summary: 'Asignar una especialidad a un usuario' })
    @ApiParam({ name: 'userId', type: String })
    @ApiParam({ name: 'specialtyId', type: Number })
    addSpecialtyToUser(
        @Param('userId') userId: string,
        @Param('specialtyId') specialtyId: number
    ) {
        return this.specialtiesService.addSpecialtyToUser(userId, specialtyId);
    }

    @Delete(':userId/specialties/:specialtyId')
    @ApiOperation({ summary: 'Quitar una especialidad de un usuario' })
    @ApiParam({ name: 'userId', type: String })
    @ApiParam({ name: 'specialtyId', type: Number })
    removeSpecialtyFromUser(
        @Param('userId') userId: string,
        @Param('specialtyId') specialtyId: number
    ) {
        return this.specialtiesService.removeSpecialtyFromUser(userId, specialtyId);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las especialidades' })
    findAll() {
        return this.specialtiesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una especialidad por su ID' })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
        return this.specialtiesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una especialidad' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateSpecialtyDto })
    update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
        return this.specialtiesService.update(+id, updateSpecialtyDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una especialidad' })
    @ApiParam({ name: 'id', type: String })
    remove(@Param('id') id: string) {
        return this.specialtiesService.remove(+id);
    }
}
