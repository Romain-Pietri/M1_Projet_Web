import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book} from './book.entity'; // Adjust the import path as necessary


@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ nullable: true })
    deathDate: Date;

    @Column("simple-array", { nullable: true })
    books: string[];
    
    @Column({ nullable: true })
    imageUrl: string; // Add this field to store the image URL

}
