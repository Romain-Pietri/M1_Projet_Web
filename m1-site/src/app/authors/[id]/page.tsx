'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { BooksProvider, useBooks } from '../../../providers/BookProvider';
import AddBook from '../../../components/AddBook';
import '../../App.css';

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

interface Book {
  id: string;
  title: string;
  publicationDate: string;
  author: string;
  price: number;
}

const AuthorDetailPageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBiography, setEditBiography] = useState('');
  const { addBook } = useBooks();

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (author) {
      fetchBooks(author.name);
    }
  }, [author]);

  const fetchAuthorDetails = async (authorId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/authors/${authorId}`);
      setAuthor(response.data);
      setEditName(response.data.name);
      setEditBiography(response.data.biography);
    } catch (error) {
      setError('Failed to fetch author details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (authorName: string) => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      const filteredBooks = response.data.filter((book: Book) => book.author === authorName);
      setBooks(filteredBooks);
    } catch (error) {
      setError('Failed to fetch books');
    }
  };

  const handleDeleteAuthor = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/authors/${id}`);
      router.push('/authors');
    } catch (error) {
      setError('Failed to delete author');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${bookId}`);
      fetchBooks(author?.name || '');
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  const handleEditAuthor = async () => {
    try {
      await axios.put(`http://localhost:3001/api/authors/${id}`, {
        name: editName,
        biography: editBiography,
      });
      fetchAuthorDetails(id as string);
      setShowEditModal(false);
    } catch (error) {
      setError('Failed to update author');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <CircularProgress color="inherit" />
    </div>
  );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-8">
        {author?.imageUrl && <img src={author.imageUrl} alt={author.name} className="w-48 h-64 object-cover rounded-lg" />}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{author?.name}</h1>
          <p className="text-lg text-center md:text-left">{author?.biography}</p>
          <p className="text-md text-center md:text-left">Date de naissance: {author?.birthDate}</p>
          {author?.deathDate && <p className="text-md text-center md:text-left">Date de décès: {author?.deathDate}</p>}
          <Button onClick={() => setShowModal(true)} className="p-2 bg-bgLight text-text hover:bg-bgMuted rounded-lg dark:bg-text dark:text-bgLight dark:hover:bg-secondary ml-4">
            Ajouter un Livre
          </Button>
          <Button onClick={() => setShowDeleteModal(true)} className="p-2 bg-red-500 text-white hover:bg-red-700 rounded-lg ml-4">
            Supprimer l'Auteur
          </Button>
          <Button onClick={() => setShowEditModal(true)} className="p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg ml-4">
            Modifier la Bio et le Nom
          </Button>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-8">Livres</h2>
      <ul className="list-disc list-inside">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between items-center">
            <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">{book.title}</a>
            <Button onClick={() => handleDeleteBook(book.id)} className="p-2 bg-red-500 text-white hover:bg-red-700 rounded-lg ml-4">
              Supprimer
            </Button>
          </li>
        ))}
      </ul>
      <AddBook showModal={showModal} closeModal={() => setShowModal(false)} onAddBook={addBook} />
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Confirmer la suppression</h2>
          <p>Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={handleDeleteAuthor} className="p-2 bg-red-500 text-white hover:bg-red-700 rounded-lg">
              Confirmer
            </Button>
            <Button onClick={() => setShowDeleteModal(false)} className="p-2 bg-gray-300 text-black hover:bg-gray-400 rounded-lg">
              Annuler
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <Box className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Modifier la Biographie et le Nom</h2>
          <div className="flex flex-col space-y-4 mt-4">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nom"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={editBiography}
              onChange={(e) => setEditBiography(e.target.value)}
              placeholder="Biographie"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <Button onClick={handleEditAuthor} className="p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
                Enregistrer
              </Button>
              <Button onClick={() => setShowEditModal(false)} className="p-2 bg-gray-300 text-black hover:bg-gray-400 rounded-lg">
                Annuler
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const AuthorDetailPage = () => (
  <BooksProvider>
    <AuthorDetailPageContent />
  </BooksProvider>
);

export default AuthorDetailPage;