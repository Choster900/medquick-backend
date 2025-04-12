import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Headers, BadRequestException, Res } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { FilesService } from 'src/files/files.service';
import { Response } from 'express';

@Controller('exams')
export class ExamsController {
    constructor(
        private readonly examsService: ExamsService,
    ) { }


    @Post("file")
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: fileFilter,
        //limits: { fileSize: 1000}
        storage: diskStorage({
            destination: './static/exams',
            filename: fileNamer
        })
    }))
    uploadProductImage(
        @UploadedFile() file: Express.Multer.File,
        @Headers() headers
    ) {
        if (!file) {
            throw new BadRequestException('Asegúrate de que haya un archivo en el body');
        }


        const protocol = headers['x-forwarded-proto'] || 'http'; // Detecta si es http o https
        const host = headers.host;

        const secureUrl = `${protocol}://${host}/api/exams/file/${file.filename}`;

        return {
            secureUrl
        };
    }


    @Get('file/:imageName')
    getExamImage(
        @Param('imageName') imageName: string,
        @Res() res: Response,
    ) {
        return this.examsService.getProtectedImage(imageName, res);
    }

    @Post()
    create(@Body() createExamDto: CreateExamDto) {
        return this.examsService.create(createExamDto);
    }

    @Get()
    findAll() {
        return this.examsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
        return this.examsService.update(+id, updateExamDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examsService.remove(+id);
    }
}
