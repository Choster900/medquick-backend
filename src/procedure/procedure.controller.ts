import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.procedureService.create(createProcedureDto);
  }

  @Get()
  findAll() {
    return this.procedureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto) {
    return this.procedureService.update(+id, updateProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedureService.remove(+id);
  }
}
