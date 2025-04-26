import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Headers, BadRequestException, Res, ParseUUIDPipe, Body, UploadedFiles } from '@nestjs/common';

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
    @UseInterceptors(FilesInterceptor('files', 10, {
        fileFilter: fileFilter,
        storage: diskStorage({
            destination: './static/exams',
            filename: fileNamer
        })
    }))
    async uploadExamToAppointment(
        @Param('medicalAppointmentId', ParseUUIDPipe) medicalAppointmentId: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body('comments') comments: string[],
        @Headers() headers
    ) {
        if (!files) {
            throw new BadRequestException('Asegúrate de que haya un archivo en el body');
        }

        const combined = files.map((file, index) => ({
            file,
            comment: comments?.[index] || null,
        }));
        console.log(combined);
        await this.examsService.uploadFile(combined, medicalAppointmentId)

        const protocol = headers['x-forwarded-proto'] || 'http'; // Detecta si es http o https
        const host = headers.host;

     /*    const secureUrl = `${protocol}://${host}/api/exams/file/${file.filename}`; */

        return true
    }


  /*   @Post("uploadToAppointment/:medicalAppointmentId")
    @UseInterceptors(FilesInterceptor('files', 10, {
        fileFilter: fileFilter,
        storage: diskStorage({
            destination: './static/exams',
            filename: fileNamer
        })
    }))
    async uploadExamToAppointment(
        @Param('medicalAppointmentId', ParseUUIDPipe) medicalAppointmentId: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body('comments') comments: string[],
        @Headers() headers
    ) {
        if (!files) {
            throw new BadRequestException('Asegúrate de que haya un archivo en el body');
        }

        const combined = files.map((file, index) => ({
            file,
            comment: comments?.[index] || null,
        }));
        console.log(combined);
        await this.examsService.uploadFile(combined, medicalAppointmentId)

        const protocol = headers['x-forwarded-proto'] || 'http'; // Detecta si es http o https
        const host = headers.host;

        const secureUrl = `${protocol}://${host}/api/exams/file/${file.filename}`;

        return true
    } */


    @Get('file/:imageName')
    getExamImage(
        @Param('imageName') imageName: string,
        @Res() res: Response,
    ) {
        return this.examsService.getProtectedImage(imageName, res);
    }
}
