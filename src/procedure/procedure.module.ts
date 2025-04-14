import { Module } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';

@Module({
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
