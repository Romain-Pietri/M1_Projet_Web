'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface Author {
  id: string;
  name: string;
  biography: string;
  photo: string;
  books: { id: string; title: string }[];
  birthDate: string;
  deathDate?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

const AuthorDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id as string);
    }
  }, [id]);

  const fetchAuthorDetails = async (authorId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/authors/${authorId}`);
      setAuthor(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des détails de l'auteur.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/authors/${id}`, author);
      fetchAuthorDetails(id as string);
    } catch (error) {
      setError("Erreur lors de la mise à jour des détails de l'auteur.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/authors/${id}`);
      router.push('/authors');
    } catch (error) {
      setError("Erreur lors de la suppression de l'auteur.");
    }
  };

  const handleAddBook = async () => {
    try {
      const newBook = { 
        title: "Nouveau Livre", 
        authorId: id,
        publicationDate: new Date().toISOString(), // Ajoutez une date de publication par défaut
        price: 0 // Ajoutez un prix par défaut
      };
      const response = await axios.post(`http://localhost:3001/api/books`, newBook);
      const bookId = response.data.id; // Assuming the response contains the new book's ID
      await axios.post(`http://localhost:3001/api/authors/${id}/books`, { bookId });
      fetchAuthorDetails(id as string);
    } catch (error) {
      setError("Erreur lors de l'ajout du livre.");
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${bookId}`);
      fetchAuthorDetails(id as string);
    } catch (error) {
      setError("Erreur lors de la suppression du livre.");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-gradient-to-r from-green-200 to-blue-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8">
        <img 
          src={author?.imageUrl || '/path/to/default/image.png'} 
          alt={author?.name} 
          className="w-48 h-64 object-cover rounded-lg shadow-md mb-4 md:mb-0" 
          onError={(e) => e.currentTarget.src = '/path/to/default/image.png'} 
        />
        <div className="flex flex-col space-y-4 w-full">
          <h1 className="text-3xl font-bold text-center md:text-left mb-2">{author?.name}</h1>
          <p className="text-lg text-center md:text-left mb-4 italic">{author?.biography || "Aucune biographie disponible"}</p>
          
          <form onSubmit={handleUpdate} className="flex flex-col space-y-2">
            <input 
              type="text" 
              value={author?.name || ''} 
              onChange={(e) => setAuthor({ ...author, name: e.target.value })} 
              className="p-2 border rounded-md"
              placeholder="Nom de l'auteur"
            />
            <textarea 
              value={author?.biography || ''} 
              onChange={(e) => setAuthor({ ...author, biography: e.target.value })} 
              className="p-2 border rounded-md"
              placeholder="Biographie"
            />
            <Button variant="contained" color="primary" type="submit" className="self-start mt-2">Mettre à jour</Button>
          </form>

          <h2 className="text-2xl font-bold text-center md:text-left mt-6">Livres :</h2>
          <ul className="list-disc list-inside">
            {author?.books.map(book => (
              <li key={book.id} className="flex justify-between items-center mt-2">
                <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">{book.title}</a>
                <button onClick={() => handleDeleteBook(book.id)} className="text-red-500 hover:text-red-700">Supprimer</button>
              </li>
            ))}
          </ul>
          <Button onClick={handleAddBook} variant="contained" color="secondary" className="mt-4">Ajouter un livre</Button>

          <Button variant="contained" color="error" onClick={handleOpen} className="mt-4">Supprimer l'auteur</Button>
          <Modal open={open} onClose={handleClose}>
            <Box className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg mx-auto mt-20 max-w-sm">
              <h2 className="text-lg font-bold">Confirmer la suppression</h2>
              <p className="mt-2">Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <Button variant="contained" color="error" onClick={handleDelete}>Confirmer</Button>
                <Button variant="outlined" onClick={handleClose}>Annuler</Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="mt-8">
        <p>Date de naissance: {author?.birthDate ? formatDate(author.birthDate) : 'N/A'}</p>
        {author?.deathDate && <p>Date de décès: {formatDate(author.deathDate)}</p>}
        <p>Livres: {author?.books.map(book => book.title).join(', ')}</p>
      </div>
    </div>
  );
};

export default AuthorDetailPage;