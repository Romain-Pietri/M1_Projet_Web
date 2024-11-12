'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import axios from 'axios';
import '../../App.css';
import DeleteBookButton from '../../../components/DeleteBookButton';
import { CircularProgress } from '@mui/material';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
    price?: number;
}

const BookDetailPage = () => {
  const { id } = useParams(); // Capture l'ID dynamique de l'URL
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookDetails(id as string);
    }
  }, [id]);

  const fetchBookDetails = async (bookId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);
      setBook(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des détails du livre.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${id}`);
      router.push('/books');
    } catch (error) {
      setError("Erreur lors de la suppression du livre.");
    }
  }

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
        <img src='https://via.placeholder.com/150' alt={book?.title} className="w-48 h-64 object-cover rounded-lg" />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{book?.title}</h1>
          <p className="text-lg text-center md:text-left">Auteur: {book?.author}</p>
          <p className="text-md text-center md:text-left">Date de publication: {book?.publicationDate}</p>
          <p className="text-lg text-center md:text-left mb-2">Prix : {book?.price} €</p>
          <DeleteBookButton onDelete={handleDelete}/>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
