import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';

import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExamsService extends PrismaClient implements OnModuleInit {

    onModuleInit() {

        this.$connect()

    }

    getProtectedImage(imageName: string, res: Response) {
        const path = join(process.cwd(), 'static', 'exams', imageName);

        if (!existsSync(path)) {
            throw new BadRequestException('No se encontró el archivo');
        }

        const stream = createReadStream(path);
        stream.pipe(res);
    }



    async uploadFile(filesWithComments: { file: Express.Multer.File, comment: string | null }[], medicalAppointmentId: string) {

        for (const { file, comment } of filesWithComments) {
            const medicalExamTypeFileId = await this.file_type.findFirst({
                where: {
                    file_type_mime_type: file.mimetype
                }
            });

            if (!medicalExamTypeFileId) {
                throw new Error('Invalid file type');
            }

            await this.medical_exam.create({
                data: {
                    medical_appointment_id: medicalAppointmentId,
                    medical_exam_type_file_id: medicalExamTypeFileId.file_type_id,
                    medical_exam_name_file: file.filename,
                    medical_exam_path: file.path,
                    medical_exam_description: comment ?? 'Sin comentario',
                    medical_exam_origin_examp: true,
                    medical_exam_date_up: new Date(),
                },
            });
        }

        return true

    }



}
