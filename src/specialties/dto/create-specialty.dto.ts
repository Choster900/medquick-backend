import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialtyDto {
    @IsNotEmpty()
    @IsString()
    specialty_name: string;

    @IsOptional()
    @IsString()
    specialty_description?: string;
}
