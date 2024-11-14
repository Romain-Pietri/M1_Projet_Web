import { Injectable } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Rating } from '../entities/rating.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from '../DTO/book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async findAll({
        search,
        sortBy,
    }: {
        search?: string;
        sortBy?: 'title' | 'date' | 'author' | 'price';
    }): Promise<(Book & { averageRating: number })[]> {
        const query = this.bookRepository.createQueryBuilder('book')
            .leftJoinAndSelect(
                (subQuery) =>
                    subQuery
                        .select('rating.bookId', 'bookId')
                        .addSelect('AVG(rating.rating)', 'averageRating')
                        .from(Rating, 'rating')
                        .groupBy('rating.bookId'),
                'ratingAvg',
                'ratingAvg.bookId = book.id'
            );
    
        // Appliquer un filtre de recherche si `search` est défini
        if (search) {
            query.where('book.title LIKE :search', { search: `%${search}%` });
        }
    
        // Appliquer un tri selon le champ spécifié par `sortBy`
        if (sortBy) {
            query.orderBy(`book.${sortBy}`, 'ASC');
        }
    
        // Exécuter la requête et obtenir les livres avec la moyenne des évaluations
        const books = await query.getRawAndEntities();
    
        // Associer chaque livre avec sa moyenne d'évaluation calculée
        const booksWithRating = books.entities.map((book, index) => ({
            ...book,
            averageRating: parseFloat(books.raw[index].averageRating) || 0, // 0 si pas de notes
        }));        
        return booksWithRating;
    }


    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    // Récupérer un livre par son ID
    async findOne(id: string): Promise<Book | null> {
        return this.bookRepository.findOne({
            where: { id },
        });
    }

    // Mettre à jour un livre
    async update(id: string, book: Book): Promise<Book> {
        await this.bookRepository.update(id, book);
        return this.bookRepository.findOne({
            where: { id },
        });
    }

    // Supprimer un livre
    async remove(id: string): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
