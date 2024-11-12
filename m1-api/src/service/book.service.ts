import { Injectable } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from '../DTO/book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll({
                      search,
                      sortBy,
                  }: {
        search?: string;
        sortBy?: 'title' | 'date' | 'author' | 'price';
    }): Promise<Book[]> {
        const query = this.bookRepository.createQueryBuilder('book');

        // Filtre de recherche
        if (search) {
            query.where('book.title LIKE :search', { search: `%${search}%` });
        }

        // Tri selon le champ et l'ordre choisis
        if (sortBy) {
            query.orderBy(`book.${sortBy}`, 'ASC');
        }

        return query.getMany();
    }


    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    // Récupérer un livre par son ID
    async findOne(id: string): Promise<Book | null> {
        return this.bookRepository.findOne({ 
            where : { id },
        });
    }

    // Mettre à jour un livre
    async update(id: string, book: Book): Promise<Book> {
        await this.bookRepository.update(id, book);
        return this.bookRepository.findOne({
            where : { id },
        });
    }

    // Supprimer un livre
    async remove(id: string): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
