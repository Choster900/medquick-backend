import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse,
} from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { UpdateBranchStatusDto } from './dto/update-dranch-status.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva sucursal' })
    @ApiResponse({ status: 201, description: 'Sucursal creada exitosamente' })
    create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchesService.create(createBranchDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las sucursales' })
    @ApiResponse({ status: 200, description: 'Lista de sucursales' })
    findAll() {
        return this.branchesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una sucursal por su ID' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 200, description: 'Sucursal encontrada' })
    @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.branchesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar datos de una sucursal' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 200, description: 'Sucursal actualizada' })
    @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBranchDto: UpdateBranchDto,
    ) {
        return this.branchesService.update(id, updateBranchDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Actualizar el estado (activo/inactivo) de una sucursal' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 200, description: 'Estado de sucursal actualizado' })
    @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
    remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBranchStatusDto: UpdateBranchStatusDto,
    ) {
        return this.branchesService.updateStatus(id, updateBranchStatusDto.branchStatus);
    }
}
