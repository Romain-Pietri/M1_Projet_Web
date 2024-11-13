import React, { useState } from 'react';

interface AddBookProps {
  showModal: boolean;
  closeModal: () => void;
  onAddBook: (newBook: { title: string, publicationDate: string, author: string, price: number }) => void;
}

const AddBook: React.FC<AddBookProps> = ({ showModal, closeModal, onAddBook }) => {
  const [newBook, setNewBook] = useState({ title: '', publicationDate: '', author: '', price: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(newBook);
    closeModal(); // Fermer la modale après ajout
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-text dark:text-bgLight border-gray-300 dark:border-gray-600">
        <div className="bg-white dark:bg-buttonDark p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Centrer le titre */}
          <h1 className="text-lg text-text font-bold mb-4 text-center">Ajouter un livre</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Titre:</label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
              />
            </div>

            {/* Centrer les boutons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-primary text-text rounded-lg hover:bg-secondary transition duration-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-bgLight text-text hover:bg-bgMuted rounded-lg transition duration-300 dark:bg-bgDark dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddBook;
