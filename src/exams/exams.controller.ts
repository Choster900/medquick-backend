import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Headers, BadRequestException, Res, ParseUUIDPipe } from '@nestjs/common';

import { Response } from 'express';
import { diskStorage } from 'multer';

import { ExamsService } from './exams.service';
import { fileFilter, fileNamer } from './helpers';

@Controller('exams')
export class ExamsController {
    constructor(
        private readonly examsService: ExamsService,
    ) { }

    /**
     *
     * Metodo de prueba ( solo sube archivos )
     *
     * @param {Express.Multer.File} file
     * @param {*} headers
     * @return {*}
     * @memberof ExamsController
     */
    @Post("file")
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: fileFilter,
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


    @Post("uploadToAppointment/:medicalAppointmentId")
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: fileFilter,
        storage: diskStorage({
            destination: './static/exams',
            filename: fileNamer
        })
    }))
    uploadExamToAppointment(
        @Param('medicalAppointmentId', ParseUUIDPipe) medicalAppointmentId: string,
        @UploadedFile() file: Express.Multer.File,
        @Headers() headers
    ) {
        if (!file) {
            throw new BadRequestException('Asegúrate de que haya un archivo en el body');
        }

        this.examsService.uploadFile(file, medicalAppointmentId)

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
}
