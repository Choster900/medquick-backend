import { PartialType } from '@nestjs/swagger';
import { CreateBranchCommentDto } from './create-branch-comment.dto';

export class UpdateBranchCommentDto extends PartialType(CreateBranchCommentDto) { }
