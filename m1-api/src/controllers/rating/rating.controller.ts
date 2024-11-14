import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { RatingService } from '../../service/rating.service';
import { CreateRatingDto } from '../../DTO/rating.dto';
import { Rating } from '../../entities/rating.entity';

@Controller('api/ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    async createRating(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.createRating(createRatingDto);
    }

    // Récupérer tous les commentaires d'un livre par son ID
    @Get('/:bookId')
    async getCommentsByBookId(@Param('bookId') bookId: string): Promise<Rating[]> {
        const comments = await this.ratingService.getCommentsByBookId(bookId);
        if (!comments || comments.length === 0) {
            throw new NotFoundException(`Aucun commentaire trouvé pour le livre avec l'ID ${bookId}.`);
        }
        return comments;
    }

    @Get()
    async getAllRatings(): Promise<Rating[]> {
        return this.ratingService.getAllRatings();
    }
}
