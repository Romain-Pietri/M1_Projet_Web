import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from './rating.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    publicationDate: string;

    @Column()
    author: string;

    @Column('float', { default: 0 })
    price: number;

    @OneToMany(() => Comment, (comment) => comment.book)
    comments: Comment[];
}
