import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { Book } from '../models/book';

interface BooksContextType {
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  addBook: (newBook: Omit<Book, 'id'>) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode; 
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books`, {
        params: { search: searchQuery, sortBy },
      });
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres:', error);
    }
  };

  const addBook = async (newBook: Omit<Book, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:3001/api/books', newBook);
      if (response.status === 200) {
        fetchBooks(); // Rafraîchir la liste des livres après ajout
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, sortBy]);

  return (
    <BooksContext.Provider
      value={{
        books,
        filteredBooks,
        searchQuery,
        sortBy,
        setSearchQuery,
        setSortBy,
        addBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBooks doit être utilisé dans un BooksProvider');
  return context;
};
