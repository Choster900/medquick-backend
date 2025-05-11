import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateBranchCommentDto, CreateMedicalCommentDto, UpdateBranchCommentDto, UpdateMedicalCommentDto } from './dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post("/branch/:branchId")
    createBranchComment(
        @Param('branchId', ParseUUIDPipe) branchId: string,
        @Body() createCommentDto: CreateBranchCommentDto
    ) {
        return this.commentsService.createBranchComment(branchId, createCommentDto);
    }

    @Post("medical/:idMedico")
    createMedicalComment(
        @Param("idMedico", ParseUUIDPipe) idMedico: string,
        @Body() createMedicalCommentDto: CreateMedicalCommentDto
    ) {
        return this.commentsService.createMedicalComment(idMedico, createMedicalCommentDto);
    }


    @Patch('branch/:commentId')
    updateBranchComment(
        @Param('commentId') commentId: number,
        @Body() dto: UpdateBranchCommentDto
    ) {
        return this.commentsService.updateBranchComment(commentId, dto);
    }

    @Patch('medical/:commentId')
    updateMedicalComment(
        @Param('commentId') commentId: number,
        @Body() dto: UpdateMedicalCommentDto
    ) {
        return this.commentsService.updateMedicalComment(commentId, dto);
    }

    // comments.controller.ts

    @Delete('branch/:commentId/:userId')
    deleteBranchComment(
        @Param('commentId') commentId: number,
        @Param('userId') userId: string,
    ) {
        return this.commentsService.deleteBranchComment(commentId, userId);
    }

    @Delete('medical/:commentId/:userId')
    deleteMedicalComment(
        @Param('commentId') commentId: number,
        @Param('userId') userId: string,
    ) {
        return this.commentsService.deleteMedicalComment(commentId, userId);
    }

    // comments.controller.ts

    @Get('medical/:medicalId')
    getMedicalComments(@Param('medicalId', ParseUUIDPipe) medicalId: string) {
        return this.commentsService.getCommentsByMedical(medicalId);
    }

    @Get('branch/:branchId')
    getBranchComments(@Param('branchId', ParseUUIDPipe) branchId: string) {
        return this.commentsService.getCommentsByBranch(branchId);
    }

}
