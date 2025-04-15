import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';

@Module({
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
