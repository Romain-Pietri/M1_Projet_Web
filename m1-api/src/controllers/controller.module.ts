import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from '../service/book.service';
import { Book } from '../entities/book.entity';
import { BookController } from '../controllers/books/book.controller';
import { AuthorController } from '../controllers/authors/authors.controller';
import { AuthorService } from '../service/author.service';
import { Author } from '../entities/author.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Author])],
    controllers: [BookController, AuthorController],
    providers: [BookService, AuthorService],
})
export class ControllerModule {}