'use client';

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

interface AuthorContextProps {
  author: Author | null;
  books: Book[];
  loading: boolean;
  error: string | null;
  editName: string;
  editBiography: string;
  setEditName: React.Dispatch<React.SetStateAction<string>>;
  setEditBiography: React.Dispatch<React.SetStateAction<string>>;
  fetchAuthorDetails: (authorId: string) => Promise<void>;
  fetchBooks: (authorName: string) => Promise<void>;
  handleDeleteAuthor: () => Promise<void>;
  handleDeleteBook: (bookId: number) => Promise<void>;
  handleEditAuthor: () => Promise<void>;
}

const AuthorContext = createContext<AuthorContextProps | undefined>(undefined);

export const AuthorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editBiography, setEditBiography] = useState<string>('');
  const router = useRouter();

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

  const handleDeleteAuthor = async () => {
    try {
      if (!author?.id) return;
      await axios.delete(`http://localhost:3001/api/authors/${author.id}`);
      router.push('/authors');
    } catch (error) {
      setError('Failed to delete author');
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${bookId}`);
      if(author) fetchBooks(author.name)
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  const handleEditAuthor = async () => {
    try {
      if (!author?.id) return;
      await axios.put(`http://localhost:3001/api/authors/${author.id}`, {
        name: editName,
        biography: editBiography,
      });
      fetchAuthorDetails(author.id);
    } catch (error) {
      setError('Failed to update author');
    } 
  };

  const fetchBooks = async (authorName: string) => {
    try {
      setLoading(true);
      if(!author) return
      const response = await axios.get(`http://localhost:3001/api/books?author=${authorName}`);
      setBooks(response.data);
    } catch (error) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthorContext.Provider
      value={{
        author,
        books,
        loading,
        error,
        editName,
        editBiography,
        setEditName,
        setEditBiography,
        fetchAuthorDetails,
        fetchBooks,
        handleDeleteAuthor,
        handleDeleteBook,
        handleEditAuthor,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthorDetail = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthor must be used within an AuthorProvider');
  }
  return context;
};
