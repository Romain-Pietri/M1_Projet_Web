import React, { useState } from 'react';
import { useBooks } from '../providers/BookProvider';

interface Author {
  id: string;
  name: string;
}

interface AddBookProps {
  showModal: boolean;
  closeModal: () => void;
  onAddBook: (newBook: { title: string, publicationDate: string, author: string, price: number, file: File }) => void;
}

const AddBook: React.FC<AddBookProps> = ({ showModal, closeModal, onAddBook }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newBook, setNewBook] = useState({ title: '', publicationDate: '', author: '', price: 0 });

  // Accédez à l'ensemble des auteurs depuis le contexte
  const { authors } = useBooks();
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que l'auteur est bien sélectionné avant d'ajouter le livre
    if (!selectedAuthor) {
      alert('Veuillez sélectionner un auteur.');
      return;
    }

    // Ajouter l'ID de l'auteur au newBook
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
    const bookWithAuthor = { ...newBook, author: selectedAuthor, price: Number(newBook.price), file: selectedFile };
    // Passer l'objet avec l'ID de l'auteur à la fonction onAddBook
    onAddBook(bookWithAuthor);
    closeModal(); // Fermer la modale après ajout
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(e.target.value);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-text dark:text-bgLight border-gray-300 dark:border-gray-600">
        <div className="bg-white dark:bg-buttonDark p-6 rounded-lg shadow-lg w-full max-w-md">
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
              <select
                value={selectedAuthor || ''}
                onChange={handleAuthorChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="" disabled>Choisissez un auteur</option>
                {/* Afficher les auteurs récupérés depuis le contexte */}
                {Array.isArray(authors) && authors.length > 0 ? (
                  authors.map((author) => (
                    <option key={author.id} value={author.name}>{author.name}</option>
                  ))
                ) : (
                  <option disabled>Aucun auteur disponible</option>
                )}
              </select>
            </div>
            <div>
              <label>Prix:</label>
              <input
                type="number"
                name="price"
                value={newBook.price}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                type="File"
                name="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              />
            </div>
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
