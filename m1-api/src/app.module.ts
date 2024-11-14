//rajouter AuthorModule et Author

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './controllers/controller.module';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { Rating } from './entities/rating.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Book,Author, Rating],
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}


