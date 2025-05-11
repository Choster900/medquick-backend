import {
    IsString,
    IsNotEmpty,
    IsUUID,
    IsOptional,
    IsNumberString,
    Length,
    IsNumber,
    IsIn,
} from 'class-validator';

export class CreateMedicalCommentDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;


    @IsString()
    @IsNotEmpty()
    @Length(3, 500)
    medicalCommentComment: string;

    @IsNumber()
    @IsNotEmpty()
    @IsIn([1, 2, 3, 4, 5], {
        message: 'El rating debe ser un valor entre 1 y 5 como number',
    })
    medicalCommentRating: number;
}
