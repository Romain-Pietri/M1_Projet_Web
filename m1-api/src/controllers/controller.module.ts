import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from '../service/book.service';
import { Book } from '../entities/book.entity';
import { BookController } from '../controllers/books/book.controller';
import { AuthorController } from '../controllers/authors/authors.controller';
import { AuthorService } from '../service/author.service';
import { Author } from '../entities/author.entity';
import { RatingController } from './rating/rating.controller';
import { RatingService } from '../service/rating.service';
import { Rating } from '../entities/rating.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, Rating])],
    controllers: [BookController, AuthorController, RatingController],
    providers: [BookService, AuthorService, RatingService],
})
export class ControllerModule {}