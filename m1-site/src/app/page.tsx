"use client";

import React from 'react';
import './App.css';
import BookOfDay from '../components/BookOfDay';
import AuthorOfDay from '../components/AuthorOfDay';
import { BooksProvider, useBooks } from '../providers/BookProvider';
//import { AuthorProvider, useAuthors } from '../providers/AuthorProvider';

const HomePageContent = () => {
    // Récupérez les livres et les auteurs depuis leurs providers
    const { filteredBooks } = useBooks();
    //const { authors, loading } = useAuthors();

    console.log("Livres dans HomePageContent:", filteredBooks);

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
                                />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default function HomePage() {
    return (
        <BooksProvider>

                <HomePageContent />

        </BooksProvider>
    );
}
