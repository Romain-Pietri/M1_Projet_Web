import { Controller, Get, Post, Body, Query, Param, Put, Delete, NotFoundException,UploadedFile, UseInterceptors,HttpCode } from '@nestjs/common';
import { BookService } from '../../service/book.service';
import { Book } from '../../entities/book.entity';
import {CreateBookDto} from "../../DTO/book.dto";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
type File = Express.Multer.File;

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
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async createBook(@Body() createBookDto: CreateBookDto, @UploadedFile() file: Express.Multer.File): Promise<Book> {
        const imageUrl = file ? `http://localhost:3001/uploads/${file.filename}` : null;
        return this.bookService.create({ ...createBookDto, imageUrl });
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

}
