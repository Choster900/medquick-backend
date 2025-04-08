import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { BranchesModule } from './branches/branches.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { ExamsModule } from './exams/exams.module';
import { PermissionsModule } from './permissions/permissions.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, InstitutionsModule, BranchesModule, SpecialtiesModule, AppointmentsModule, PrescriptionsModule, ExamsModule, PermissionsModule, FilesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
