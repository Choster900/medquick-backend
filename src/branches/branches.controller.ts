import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { UpdateBranchStatusDto } from './dto/update-dranch-status.dto';

@Controller('branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Post()
    create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchesService.create(createBranchDto);
    }

    @Get()
    findAll() {
        return this.branchesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.branchesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBranchDto: UpdateBranchDto) {
        return this.branchesService.update(id, updateBranchDto);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBranchStatusDto: UpdateBranchStatusDto
    ) {
        return this.branchesService.updateStatus(id, updateBranchStatusDto.branchStatus);
    }
}
