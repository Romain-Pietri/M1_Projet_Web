import { Controller, Get, Post, Body, Query, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { BookService } from '../../service/book.service';
import { Book } from '../../entities/book.entity';
import {CreateBookDto} from "../../DTO/book.dto";

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    // Route pour obtenir la liste des livres avec option de recherche et de tri
    @Get()
    async getBooks(
        @Query('search') search?: string,
        @Query('sortBy') sortBy?: 'title' | 'date' | 'author' | 'price',
    ): Promise<Book[]> {
        return this.bookService.findAll({ search, sortBy });
    }

    // Route pour ajouter un nouveau livre
    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
    }

    // Récupérer un livre par son ID
    @Get('/:id')
    async getBook(@Param('id') id: string): Promise<Book> {
        const book = await this.bookService.findOne(id);
        if (!book) {
          throw new Error('Livre non trouvé'); 
        }
        return book;
    }

    // Mettre à jour un livre
    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
        const updatedBook = await this.bookService.update(id, book);
        if (!updatedBook) {
          throw new Error('Livre non trouvé'); 
        }
        return updatedBook;
    }

    // Supprimer un livre
    @Delete('/:id')
    async deleteBook(@Param('id') id: string): Promise<void> {
        const book = await this.bookService.findOne(id);
        if (!book) {
            throw new NotFoundException('Livre non trouvé'); 
        }
        await this.bookService.remove(id);
    }

    // Ajout commentaires


}
