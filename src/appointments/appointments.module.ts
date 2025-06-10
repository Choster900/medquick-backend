import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { EmailService } from 'src/common/services/email/email.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService,EmailService],
})
export class AppointmentsModule {}
