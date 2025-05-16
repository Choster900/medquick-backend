import { Module } from '@nestjs/common';
import { EmailService } from './services/email/email.service';

@Module({
    controllers: [],
    providers: [EmailService],
    imports: [],
    exports: [EmailService]
})
export class CommonModule { }
