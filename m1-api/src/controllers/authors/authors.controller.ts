import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Author } from '../../entities/author.entity';
import { AuthorService } from '../../service/author.service';
import { CreateAuthorDto } from 'src/DTO/author.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';

type File = Express.Multer.File;

@Controller('api/authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    async getAllAuthors(
        @Query('search') search?: string,
        @Query('sortBy') sortBy?: 'name' | 'birthDate' | 'deathDate' | 'books'
    ): Promise<Author[]> {
        return this.authorService.getAllAuthors({ search, sortBy });
    }

    @Put()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async createauthor(@Body() createauthor: CreateAuthorDto, @UploadedFile() file: Express.Multer.File): Promise<Author> {
        const imageUrl = file ? `http://localhost:3001/uploads/${file.filename}` : null;
        return this.authorService.create({ ...createauthor, imageUrl });
    }

    @Post()
    async AddNewBookToAuthor(@Body() body: { id: string, book: string }): Promise<Author> {
        const { id, book } = body;
        return this.authorService.AddNewBookToAuthor(id, book);
    }

    @Patch()
    async RemoveBookFromAuthor(@Body() body:{id: string, book: string}): Promise<Author> {
        const { id, book } = body;
        return this.authorService.RemoveBookFromAuthor(id, book);
    }

    @Delete()
    async remove(@Body() body:{id: string}): Promise<void> {
        const { id } = body;
        return this.authorService.remove(id);
    }

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadAuthorImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Author> {
        const imageUrl = `http://localhost:3001/uploads/${file.filename}`;
        return this.authorService.updateAuthorImage(id, imageUrl);
    }

    @Get(':id')
    async getAuthor(@Param('id') id: string): Promise<Author> {
        return this.authorService.findOne(id);
    }

    @Put(':id')
    async updateAuthor(@Param('id') id: string, @Body() updateAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorService.update(id, updateAuthorDto);
    }

    @Delete(':id')
    async removeAuthor(@Param('id') id: string): Promise<void> {
        return this.authorService.remove(id);
    }

    @Post(':id/books')
    async addBookToAuthor(@Param('id') id: string, @Body() body: { bookId: string }): Promise<Author> {
        const { bookId } = body;
        return this.authorService.AddNewBookToAuthor(id, bookId);
    }

    @Delete(':id/books/:bookId')
    async removeBookFromAuthor(@Param('id') id: string, @Param('bookId') bookId: string): Promise<Author> {
        return this.authorService.RemoveBookFromAuthor(id, bookId);
    }
}