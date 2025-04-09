import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsOptional } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {

    @IsOptional()
    branchStatus: boolean
}
