import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';

@Module({
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
})
export class SpecialtiesModule {}
