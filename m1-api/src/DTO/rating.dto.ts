import { IsInt, IsNotEmpty, IsString, Max, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating: number; // Note entre 1 et 5

    @IsOptional()
    @IsString()
    comment?: string;

    @IsString()
    @IsNotEmpty()
    bookId: string; // ID du livre pour associer l'avis à un livre
}
