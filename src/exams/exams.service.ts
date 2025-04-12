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
            throw new BadRequestException('No se encontró el archivo');
        }

        const stream = createReadStream(path);
        stream.pipe(res);
    }
}
