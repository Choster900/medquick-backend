import { BadRequestException, Injectable } from '@nestjs/common';

import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Response } from 'express';

@Injectable()
export class ExamsService {


    getProtectedImage(imageName: string, res: Response) {
        const path = join(process.cwd(), 'static', 'exams', imageName);

        if (!existsSync(path)) {
            throw new BadRequestException('No se encontró la imagen');
        }

        const stream = createReadStream(path);
        stream.pipe(res);
    }
    create(createExamDto: CreateExamDto) {
        return 'This action adds a new exam';
    }

    findAll() {
        return `This action returns all exams`;
    }

    findOne(id: number) {
        return `This action returns a #${id} exam`;
    }

    update(id: number, updateExamDto: UpdateExamDto) {
        return `This action updates a #${id} exam`;
    }

    remove(id: number) {
        return `This action removes a #${id} exam`;
    }
}
