import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
