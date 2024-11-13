import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user: string;

    @Column({ nullable: true })
    comment: string | null;

    @Column()
    rating: number;

    //permet de supprimer les commentaires liés à un livre supprimé
    @ManyToOne(() => Book, (book) => book.id, {
        onDelete: 'CASCADE',
    })
    book: Book;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}