'use client';

import React, { useState, useEffect } from 'react';
import { AuthorsProvider, useAuthors } from '../../providers/AuthorProvider';
import { BooksProvider, useBooks } from '../../providers/BookProvider';
import AuthorOfTheDay from '../../components/AuthorTile';
import AddAuthor from '../../components/AddAuthor';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import '../App.css';

const AuthorsPageContent = () => {
    const { filteredAuthors, searchQuery, setSearchQuery, sortBy, setSortBy, addAuthor, fetchAllBooks } = useAuthors() as {
        filteredAuthors: Author[];
        searchQuery: string;
        setSearchQuery: (query: string) => void;
        sortBy: string;
        setSortBy: (sort: string) => void;
        addAuthor: (newAuthor: Omit<Author, 'id'>, file?: File) => Promise<void>;
        fetchAllBooks: () => Promise<Book[]>;
    };

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
        <div className="p-8 dark:bg-buttonDark">
            <h1 className="text-3xl font-semibold mb-6 p-8 text-center text-text dark:text-bgLight">Liste des Auteurs</h1>

            {/* Conteneur de la barre de recherche et du bouton d'ajout */}
            <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto w-full">
                
                {/* Barre de recherche centrée */}
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md dark:bg-buttonDark dark:border-gray-600 dark:text-white">
                        <input
                            type="text"
                            placeholder="Rechercher un auteur par nom"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 text-gray-700 focus:outline-none dark:bg-text dark:text-bgLight"
                        />
                    </div>
                </div>

                {/* Bouton pour ajouter un nouvel auteur aligné à droite */}
                <button onClick={() => setShowModal(true)} className="p-2 bg-bgLight text-text hover:bg-bgMuted rounded-lg dark:bg-text dark:text-bgLight dark:hover:bg-secondary ml-4">
                    Ajouter un Auteur
                </button>
            </div>

            {/* Filtres de tri */}
            <div className="flex gap-4 justify-center mt-4">
                <label className="font-medium dark:text-bgLight">Trier par :</label>
                <select onChange={handleSortChange} value={sortBy} className="p-2 border border-gray-300 rounded-lg dark:bg-text dark:border-gray-600 dark:text-white">
                    <option value="">Aucun</option>
                    <option value="name">Nom</option>
                    <option value="birthDate">Date de naissance</option>
                    <option value="deathDate">Date de décès</option>
                </select>
            </div>

            {/* Liste des auteurs */}
            <ul className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mt-6">
                {filteredAuthors.map((author) => (
                    <AuthorOfTheDay
                        key={author.id}
                        id={author.id}
                        name={author.name}
                        image={author.imageUrl}
                        bookCount={getBookCount(author.name)}
                        Note={AverageNote(author.name)}
                    />
                ))}
            </ul>

            {/* Composant AddAuthor pour afficher la modale */}
            <AddAuthor showModal={showModal} closeModal={() => setShowModal(false)} onAddAuthor={addAuthor} />
        </div>
    );
};

const AuthorsPage = () => (
    <BooksProvider>
        <AuthorsProvider>
            <AuthorsPageContent />
        </AuthorsProvider>
    </BooksProvider>
);

export default AuthorsPage;