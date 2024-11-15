import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

    @Column({ nullable: true })
    imageUrl: string;
}
