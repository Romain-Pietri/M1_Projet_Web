import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';


import { Book } from '../entities/book.entity';

export type RatingId = string & { __brand: 'Comment' };

@Entity('ratings')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: RatingId;

    @Column()
    user: string;

    @Column()
    comment: string;

    @Column()
    rating: number;

    //permet de supprimer les commentaires liés à un livre supprimé
    @ManyToOne(() => Book, (book) => book.id, {
        onDelete: 'CASCADE',
    })
    book: Book;
}