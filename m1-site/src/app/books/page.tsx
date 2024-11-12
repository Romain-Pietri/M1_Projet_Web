'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookOfDay from '../../components/BookOfDay';
import '../App.css';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
    price: number;
}

const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', publicationDate: '', author: '' , price: 0});
    const [sortBy, setSortBy] = useState('');

    // Fonction pour récupérer les livres avec les paramètres de tri et de recherche
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/books`, {
                params: {
                    search: searchQuery,
                    sortBy,
                },
            });
            setBooks(response.data);
            setFilteredBooks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [searchQuery, sortBy]);



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };


    // Afficher la modale pour ajouter un livre
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });
        if (response.ok) {
            fetchBooks(); // Actualiser la liste des livres
            closeModal(); // Fermer la modale après ajout
        } else {
            console.error("Erreur lors de l'ajout du livre");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 p-8 text-center text-text dark:text-bgLight" >Liste des Livres</h1>

            {/* Barre de recherche */}
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md">
                <input
                    type="text"
                    placeholder="Rechercher un livre par titre"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 text-gray-700 focus:outline-none"
                />
            </div>

            {/* Filtres de tri */}
            <div className="flex gap-4 mt-4">
                <label className="font-medium">Trier par :</label>
                <select onChange={handleSortChange} value={sortBy} className="p-2 border border-gray-300 rounded-lg">
                    <option value="">Aucun</option>
                    <option value="title">Titre</option>
                    <option value="publicationDate">Date de publication</option>
                    <option value="author">Auteur</option>
                    <option value="price">Prix</option>
                </select>

            </div>

            {/* Bouton pour ajouter un nouveau livre */}
            <button onClick={openModal} className="mt-4 p-2 bg-bgLight  text-text rounded">
                Ajouter un Livre
            </button>

            {/* Liste des livres */}
            <ul className="flex flex-wrap justify-center gap-8">
                {filteredBooks.map(book => (
                    <BookOfDay
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        //image={book.image}
                        //rating={book.rating}
                    />
                ))}
            </ul>


            {/* Modale pour ajouter un livre */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100" >Ajouter un livre</h2>
                        <form onSubmit={handleAddBook}>
                            <div>
                                <label>Titre:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label>Date de publication:</label>
                                <input
                                    type="date"
                                    name="publicationDate"
                                    value={newBook.publicationDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"

                                />
                            </div>
                            <div>
                                <label>Auteur:</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"

                                />
                            </div>
                            <div>
                                <label>Prix:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newBook.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <button onClick={closeModal}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">

                                Annuler
                            </button>
                            <button type="submit"
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                                Ajouter
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
