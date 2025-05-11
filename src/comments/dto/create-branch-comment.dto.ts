import { IsString, IsNotEmpty, IsIn, isNumber, IsNumber } from 'class-validator';

export class CreateBranchCommentDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    branchCommentComment: string;

    @IsNumber()
    @IsNotEmpty()
    @IsIn([1, 2, 3, 4, 5], {
        message: 'El rating debe ser un valor entre 1 y 5 como number',
    })
    branchCommentRating: number;
}
