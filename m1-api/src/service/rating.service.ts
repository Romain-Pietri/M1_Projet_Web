import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Book } from '../entities/book.entity';
import { CreateRatingDto } from '../DTO/rating.dto';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>,
        @InjectRepository(Book) 
        private bookRepository: Repository<Book>
    ) {}

    // Créer un nouveau commentaire
    async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
        // Vérification si le livre existe
        const book = await this.bookRepository.findOne({ where: { id: createRatingDto.bookId } });
        if (!book) {
            throw new NotFoundException(`Livre avec l'ID ${createRatingDto.bookId} non trouvé.`);
        }

        // Création du commentaire (comment est facultatif)
        const newComment = this.ratingRepository.create({...createRatingDto, book});
        return this.ratingRepository.save(newComment);
    }

    // Récupérer les commentaires d'un livre spécifique par son ID
    async getCommentsByBookId(bookId: string): Promise<Rating[]> {
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
          throw new NotFoundException(`Livre avec l'ID ${bookId} non trouvé.`);
        }
    
        // Récupérer les commentaires du livre
        return this.ratingRepository.find({
          where: { book: { id: bookId } },
          relations: ['book'],
        });
    }
    async getAllRatings(): Promise<Rating[]> {
        return this.ratingRepository.find();
    }

}
