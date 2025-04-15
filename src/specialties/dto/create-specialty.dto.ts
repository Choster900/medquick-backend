import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialtyDto {
    
    @IsNotEmpty()
    @IsString()
    specialtyName: string;

    @IsOptional()
    @IsString()
    specialtyDescription?: string;
}
