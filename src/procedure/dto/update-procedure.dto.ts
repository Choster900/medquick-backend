import { PartialType } from '@nestjs/swagger';
import { CreateProcedureDto } from './create-procedure.dto';

export class UpdateProcedureDto extends PartialType(CreateProcedureDto) {}
