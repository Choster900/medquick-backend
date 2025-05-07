import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ExamsModule } from './exams/exams.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { BranchesModule } from './branches/branches.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { PermissionsModule } from './permissions/permissions.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { ChatModule } from './chat/chat.module';
import { ProcedureModule } from './procedure/procedure.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        AuthModule,
        ExamsModule,
        FilesModule,
        UsersModule,
        CommonModule,
        BranchesModule,
        SpecialtiesModule,
        PermissionsModule,
        InstitutionsModule,
        AppointmentsModule,
        PrescriptionsModule,
        ChatModule,
        ProcedureModule,
        NotificationsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
