import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Controller('specialties')
export class SpecialtiesController {
    constructor(private readonly specialtiesService: SpecialtiesService) { }

    @Post()
    create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
        return this.specialtiesService.create(createSpecialtyDto);
    }

    @Post(':userId/specialties/:specialtyId')
    async addSpecialtyToUser(
        @Param('userId') userId: string,
        @Param('specialtyId') specialtyId: number
    ) {
        return this.specialtiesService.addSpecialtyToUser(userId, specialtyId);
    }

    @Delete(':userId/specialties/:specialtyId')
    async removeSpecialtyFromUser(
        @Param('userId') userId: string,
        @Param('specialtyId') specialtyId: number
    ) {
        return this.specialtiesService.removeSpecialtyFromUser(userId, specialtyId);
    }

    @Get()
    findAll() {
        return this.specialtiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.specialtiesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
        return this.specialtiesService.update(+id, updateSpecialtyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.specialtiesService.remove(+id);
    }
}
