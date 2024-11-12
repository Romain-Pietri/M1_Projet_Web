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
      const newBook = { title: "Nouveau Livre", authorId: id };
      await axios.post(`http://localhost:3001/api/books`, newBook);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-8">
        <img src={author?.photo} alt={author?.name} className="w-48 h-64 object-cover rounded-lg" />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{author?.name}</h1>
          <p className="text-lg text-center md:text-left">Biographie: {author?.biography}</p>
          <form onSubmit={handleUpdate}>
            <input type="text" value={author?.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })} />
            <textarea value={author?.biography} onChange={(e) => setAuthor({ ...author, biography: e.target.value })} />
            <button type="submit">Mettre à jour</button>
          </form>
          <h2 className="text-2xl font-bold text-center md:text-left mt-4">Livres:</h2>
          <ul>
            {author?.books.map(book => (
              <li key={book.id}>
                <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">{book.title}</a>
                <button onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddBook}>Ajouter un livre</button>
          <Button variant="contained" color="secondary" onClick={handleOpen}>Supprimer l'auteur</Button>
          <Modal open={open} onClose={handleClose}>
            <Box className="p-4 bg-white rounded-lg shadow-lg">
              <h2>Confirmer la suppression</h2>
              <p>Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
              <Button variant="contained" color="secondary" onClick={handleDelete}>Confirmer</Button>
              <Button variant="contained" onClick={handleClose}>Annuler</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailPage;