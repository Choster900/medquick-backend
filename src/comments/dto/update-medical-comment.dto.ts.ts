import { PartialType } from '@nestjs/swagger';
import { CreateMedicalCommentDto } from './create-medical-comment.dto';

export class UpdateMedicalCommentDto extends PartialType(CreateMedicalCommentDto) { }
