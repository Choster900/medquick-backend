import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva institución' })
    @ApiBody({ type: CreateInstitutionDto })
    @ApiResponse({ status: 201, description: 'Institución creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createInstitutionDto: CreateInstitutionDto) {
        return this.institutionsService.create(createInstitutionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las instituciones' })
    @ApiResponse({ status: 200, description: 'Lista de instituciones obtenida exitosamente' })
    findAll() {
        return this.institutionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una institución por su ID' })
    @ApiParam({ name: 'id', description: 'ID de la institución', type: String })
    @ApiResponse({ status: 200, description: 'Institución encontrada exitosamente' })
    @ApiResponse({ status: 404, description: 'Institución no encontrada' })
    findOne(@Param('id') id: string) {
        return this.institutionsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una institución existente' })
    @ApiParam({ name: 'id', description: 'ID de la institución a actualizar', type: String })
    @ApiBody({ type: UpdateInstitutionDto })
    @ApiResponse({ status: 200, description: 'Institución actualizada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Institución no encontrada' })
    update(
        @Param('id') id: string,
        @Body() updateInstitutionDto: UpdateInstitutionDto,
    ) {
        return this.institutionsService.update(id, updateInstitutionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una institución' })
    @ApiParam({ name: 'id', description: 'ID de la institución a eliminar', type: String })
    @ApiResponse({ status: 200, description: 'Institución eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Institución no encontrada' })
    remove(@Param('id') id: string) {
        return this.institutionsService.remove(id);
    }
}
