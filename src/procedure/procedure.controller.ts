import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Controller('procedure')
export class ProcedureController {
    constructor(private readonly procedureService: ProcedureService) { }

    @Post()
    create(@Body() createProcedureDto: CreateProcedureDto) {
        return this.procedureService.create(createProcedureDto);
    }

    @Get()
    findAll(@Query('branchId') branchId?: string) {
        return this.procedureService.findAll(branchId);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.procedureService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProcedureDto: UpdateProcedureDto) {
        return this.procedureService.update(id, updateProcedureDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.procedureService.remove(id);
    }
}
