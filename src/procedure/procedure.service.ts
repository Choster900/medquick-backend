import { Injectable } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Injectable()
export class ProcedureService {
  create(createProcedureDto: CreateProcedureDto) {
    return 'This action adds a new procedure';
  }

  findAll() {
    return `This action returns all procedure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procedure`;
  }

  update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return `This action updates a #${id} procedure`;
  }

  remove(id: number) {
    return `This action removes a #${id} procedure`;
  }
}
