'use client';

import React, { useState, useEffect } from 'react';
import { AuthorsProvider, useAuthors } from '../providers/AuthorProvider';
import { BooksProvider, useBooks } from '../providers/BookProvider';
import AuthorOfTheDay from '../components/AuthorTile';
import BookOfDay from '../components/BookTile';
import AddAuthor from '../components/AddAuthor';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import './App.css';

const HomePageContent = () => {
    const { filteredAuthors, searchQuery, setSearchQuery, sortBy, setSortBy, addAuthor, fetchAllBooks } = useAuthors() as {
        filteredAuthors: Author[];
        searchQuery: string;
        setSearchQuery: (query: string) => void;
        sortBy: string;
        setSortBy: (sort: string) => void;
        addAuthor: (newAuthor: Omit<Author, 'id'>, file?: File) => Promise<void>;
        fetchAllBooks: () => Promise<Book[]>;
    };

    const { filteredBooks } = useBooks();

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await fetchAllBooks();
            setBooks(books);
        };
        fetchBooks();
    }, [fetchAllBooks]);

    const [showModal, setShowModal] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const getBookCount = (authorName: string) => {
        return books.filter(book => book.author === authorName).length;
    };
    const AverageNote = (authorName: string) =>
        {
            let booksAuthor = books.filter(book => book.author === authorName);
            let sum = 0;
            booksAuthor.forEach(book => {
                if (book.averageRating !== undefined) {
                    sum += book.averageRating;
                }
            });
            return sum / booksAuthor.length;
        }

    return (
        <div className="dark:bg-buttonDark dark:text-white min-h-screen">
            <main className="p-8 text-center text-text dark:text-bgLight">
                <p className="text-3xl mb-7">Bienvenue sur notre site dédié aux livres et aux auteurs !</p>

                {/* Section des livres du jour */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Livres du jour</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {filteredBooks.slice(0, 3).map((book) => (
                            <BookOfDay
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                rating={book.averageRating}
                            />
                        ))}
                    </div>
                </section>

                {/* Section des auteurs du jour */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Auteurs du jour</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {filteredAuthors.slice(0, 3).map((author) => (
                            <AuthorOfTheDay
                                key={author.id}
                                id={author.id}
                                name={author.name}
                                image={author.imageUrl}
                                bookCount={getBookCount(author.name)}
                                Note={AverageNote(author.name)}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

const HomePage = () => (
    <BooksProvider>
        <AuthorsProvider>
            <HomePageContent />
        </AuthorsProvider>
    </BooksProvider>
);

export default HomePage;