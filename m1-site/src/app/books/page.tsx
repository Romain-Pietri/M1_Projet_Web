'use client';

import React, { useState } from 'react';
import { BooksProvider, useBooks } from '../../providers/BookProvider';
import BookOfDay from '../../components/BookOfDay';
import AddBook from '../../components/AddBook';
import '../App.css';

const BooksPageContent = () => {
  const { filteredBooks, searchQuery, setSearchQuery, sortBy, setSortBy, addBook } = useBooks();
  const [showModal, setShowModal] = useState(false); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="p-4 dark:bg-buttonDark">
      <h1 className="text-3xl font-semibold mb-6 p-8 text-center text-text dark:text-bgLight">Liste des Livres</h1>

      {/* Conteneur de la barre de recherche et du bouton d'ajout */}
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto w-full">
        
        {/* Barre de recherche centrée */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md dark:bg-buttonDark dark:border-gray-600 dark:text-white">
            <input
              type="text"
              placeholder="Rechercher un livre par titre"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 text-gray-700 focus:outline-none dark:bg-text dark:text-bgLight"
            />
          </div>
        </div>

        {/* Bouton pour ajouter un nouveau livre aligné à droite */}
        <button onClick={() => setShowModal(true)} className="p-2 bg-bgLight text-text hover:bg-bgMuted rounded-lg dark:bg-text dark:text-bgLight dark:hover:bg-secondary ml-4">
          Ajouter un Livre
        </button>
      </div>

      {/* Filtres de tri */}
      <div className="flex gap-4 justify-center mt-4">
        <label className="font-medium dark:text-bgLight">Trier par :</label>
        <select onChange={handleSortChange} value={sortBy} className="p-2 border border-gray-300 rounded-lg dark:bg-text dark:border-gray-600 dark:text-white">
          <option value="">Aucun</option>
          <option value="title">Titre</option>
          <option value="publicationDate">Date de publication</option>
          <option value="author">Auteur</option>
          <option value="price">Prix</option>
        </select>
      </div>

      {/* Liste des livres */}
      <ul className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mt-6">
        {filteredBooks.map((book) => (
          <BookOfDay key={book.id} id={book.id} title={book.title} author={book.author} image={book.imageUrl} />
        ))}
      </ul>

      {/* Composant AddBook pour afficher la modale */}
      <AddBook showModal={showModal} closeModal={() => setShowModal(false)} onAddBook={addBook} />
    </div>
  );
};

const BooksPage = () => (
  <BooksProvider>
    <BooksPageContent />
  </BooksProvider>
);

export default BooksPage;