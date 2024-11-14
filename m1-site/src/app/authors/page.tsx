'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorOfTheDay from '../../components/AuthorOfDay'; // Importez le composant AuthorOfTheDay

interface Author {
    id: number;
    name: string;
    birthDate: string;
    deathDate: string;
    books: string[];
    isAlive: boolean;
    firstName?: string; 
    lastName?: string;  
    imageUrl?: string;
}

const AuthorsPage = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newAuthor, setNewAuthor] = useState({ name: '', birthDate: '', deathDate: '', books: [], isAlive: false });
    const [sortBy, setSortBy] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Fonction pour récupérer les auteurs avec les paramètres de tri et de recherche
    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/authors`, {
                params: {
                    search: searchQuery,
                    sortBy,
                },
            });
            setAuthors(response.data);
            setFilteredAuthors(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des auteurs:', error);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, [searchQuery, sortBy]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    // Afficher la modale pour ajouter un auteur
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAuthor(prevAuthor => ({ ...prevAuthor, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewAuthor(prevAuthor => ({ ...prevAuthor, [name]: checked, deathDate: checked ? '' : prevAuthor.deathDate }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddAuthor = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newAuthor.name);
        formData.append('birthDate', newAuthor.birthDate);
        formData.append('deathDate', newAuthor.deathDate);
        formData.append('books', JSON.stringify(newAuthor.books));
        formData.append('isAlive', JSON.stringify(newAuthor.isAlive));
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        const response = await fetch('http://localhost:3001/api/authors', {
            method: 'PUT',
            body: formData,
        });
        if (response.ok) {
            fetchAuthors(); // Actualiser la liste des auteurs
            closeModal(); // Fermer la modale après ajout
        } else {
            console.error("Erreur lors de l'ajout de l'auteur");
        }
    };

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 p-8 text-center text-text dark:text-bgLight">Liste des Auteurs</h1>

            {/* Barre de recherche */}
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md">
                <input
                    type="text"
                    placeholder="Rechercher un auteur par nom"
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
                    <option value="name">Nom</option>
                    <option value="birthDate">Date de naissance</option>
                    <option value="deathDate">Date de décès</option>
                </select>
            </div>

            {/* Bouton pour ajouter un nouvel auteur */}
            <button onClick={openModal} className="mt-4 p-2 bg-bgLight text-text rounded">
                Ajouter un Auteur
            </button>

            {/* Liste des auteurs */}
            <ul className="flex flex-wrap justify-center gap-8">
                {filteredAuthors.map(author => (
                    <li key={author.id} className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
                        <AuthorOfTheDay
                            id={author.id}
                            firstName={author.firstName}
                            lastName={author.lastName}
                            image={author.imageUrl}
                        />
                        <p>Date de naissance: {formatDate(author.birthDate)}</p>
                        {author.deathDate && <p>Date de décès: {formatDate(author.deathDate)}</p>}
                        <p>Livres: {author.books.join(', ')}</p>
                    </li>
                ))}
            </ul>

            {/* Modale pour ajouter un auteur */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Ajouter un auteur</h2>
                        <form onSubmit={handleAddAuthor}>
                            <div>
                                <label>Nom:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newAuthor.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label>Date de naissance:</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={newAuthor.birthDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label>Date de décès:</label>
                                <input
                                    type="date"
                                    name="deathDate"
                                    value={newAuthor.deathDate}
                                    onChange={handleInputChange}
                                    disabled={newAuthor.isAlive}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isAlive"
                                        checked={newAuthor.isAlive}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    Encore en vie
                                </label>
                            </div>
                            <div>
                                <label>Image:</label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
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

export default AuthorsPage;