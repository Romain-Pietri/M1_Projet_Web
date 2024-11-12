import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from '../service/book.service';
import { BookController } from '../controllers/books/book.controller';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
})
export class BooksModule {}
