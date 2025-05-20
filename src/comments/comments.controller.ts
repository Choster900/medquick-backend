import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse,
} from '@nestjs/swagger';
import {
    CreateBranchCommentDto,
    CreateMedicalCommentDto,
    UpdateBranchCommentDto,
    UpdateMedicalCommentDto,
} from './dto';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post('branch/:branchId')
    @ApiOperation({ summary: 'Crear comentario en una sucursal' })
    @ApiParam({ name: 'branchId', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 201, description: 'Comentario de sucursal creado' })
    createBranchComment(
        @Param('branchId', ParseUUIDPipe) branchId: string,
        @Body() createCommentDto: CreateBranchCommentDto,
    ) {
        return this.commentsService.createBranchComment(branchId, createCommentDto);
    }

    @Post('medical/:idMedico')
    @ApiOperation({ summary: 'Crear comentario para un médico' })
    @ApiParam({ name: 'idMedico', type: 'string', format: 'uuid' })
    @ApiResponse({ status: 201, description: 'Comentario de médico creado' })
    createMedicalComment(
        @Param('idMedico', ParseUUIDPipe) idMedico: string,
        @Body() createMedicalCommentDto: CreateMedicalCommentDto,
    ) {
        return this.commentsService.createMedicalComment(idMedico, createMedicalCommentDto);
    }

    @Patch('branch/:commentId')
    @ApiOperation({ summary: 'Actualizar comentario de sucursal' })
    @ApiParam({ name: 'commentId', type: 'number' })
    updateBranchComment(
        @Param('commentId') commentId: number,
        @Body() dto: UpdateBranchCommentDto,
    ) {
        return this.commentsService.updateBranchComment(commentId, dto);
    }

    @Patch('medical/:commentId')
    @ApiOperation({ summary: 'Actualizar comentario de médico' })
    @ApiParam({ name: 'commentId', type: 'number' })
    updateMedicalComment(
        @Param('commentId') commentId: number,
        @Body() dto: UpdateMedicalCommentDto,
    ) {
        return this.commentsService.updateMedicalComment(commentId, dto);
    }

    @Delete('branch/:commentId/:userId')
    @ApiOperation({ summary: 'Eliminar comentario de sucursal' })
    @ApiParam({ name: 'commentId', type: 'number' })
    @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
    deleteBranchComment(
        @Param('commentId') commentId: number,
        @Param('userId') userId: string,
    ) {
        return this.commentsService.deleteBranchComment(commentId, userId);
    }

    @Delete('medical/:commentId/:userId')
    @ApiOperation({ summary: 'Eliminar comentario de médico' })
    @ApiParam({ name: 'commentId', type: 'number' })
    @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
    deleteMedicalComment(
        @Param('commentId') commentId: number,
        @Param('userId') userId: string,
    ) {
        return this.commentsService.deleteMedicalComment(commentId, userId);
    }

    @Get('medical/:medicalId')
    @ApiOperation({ summary: 'Obtener comentarios por médico' })
    @ApiParam({ name: 'medicalId', type: 'string', format: 'uuid' })
    getMedicalComments(@Param('medicalId', ParseUUIDPipe) medicalId: string) {
        return this.commentsService.getCommentsByMedical(medicalId);
    }

    @Get('branch/:branchId')
    @ApiOperation({ summary: 'Obtener comentarios por sucursal' })
    @ApiParam({ name: 'branchId', type: 'string', format: 'uuid' })
    getBranchComments(@Param('branchId', ParseUUIDPipe) branchId: string) {
        return this.commentsService.getCommentsByBranch(branchId);
    }
}
