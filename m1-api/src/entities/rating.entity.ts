import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Book } from './book.entity';

@Entity('ratings')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user: string;

    @Column({ nullable: true })
    comment: string | null;

    @Column()
    rating: number;

    //permet de supprimer les commentaires liés à un livre supprimé
    @ManyToOne(() => Book, (book) => book.comments, {
        onDelete: 'CASCADE',
    })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}