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



    async uploadFile(file: any, medicalAppointmentId: string) {

        const updatedAppointment = await this.medical_exam.create({
            data: {
                medical_appointment_id: medicalAppointmentId,
                medical_exam_type_file_id: 1,
                medical_exam_name_file: '',
                medical_exam_path: '',
                medical_exam_description: '',
                medical_exam_origin_examp: true,
                medical_exam_date_up: '',
                medical_exam_created_at: '',
                medical_exam_updated_at: '',

            }
        })

        return updatedAppointment

    }



}
