import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { RatingService } from '../../service/rating.service';
import { CreateRatingDto } from '../../DTO/rating.dto';
import { Rating } from '../../entities/rating.entity';

@Controller('api/ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Post()
    async createRating(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.createRating(createRatingDto);
    }

    // Récupérer tous les commentaires d'un livre par son ID
    @Get('/:bookId')
    async getCommentsByBookId(@Param('bookId') bookId: string): Promise<Rating[]> {
        try { 
            const comments = await this.ratingService.getCommentsByBookId(bookId) 
            return comments;
        }
        catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get()
    async getAllRatings(): Promise<Rating[]> {
        return this.ratingService.getAllRatings();
    }
}
