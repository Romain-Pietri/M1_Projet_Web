'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import {Author} from '../models/author.model';
import {Book} from '../models/book.model';
interface AuthorsContextType {
    authors: Author[];
    filteredAuthors: Author[];
    searchQuery: string;
    sortBy: string;
    setSearchQuery: (query: string) => void;
    setSortBy: (sort: string) => void;
    addAuthor: (newAuthor: Omit<Author, 'id'>, file: File | null) => Promise<void>;
    fetchAllBooks: () => Promise<Book[]>;
    
}

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

interface AuthorsProviderProps {
    children: ReactNode;
}

export const AuthorsProvider: React.FC<AuthorsProviderProps> = ({ children }) => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

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
  const fetchAllBooks = async () => {
    // Récupérer les livres des auteurs et les mettre dans une map avec le nom de l'auteur comme clé et la Note comme valeur
    const response = await axios.get(`http://localhost:3001/api/books`);
    setBooks(response.data);
    return response.data;
}




    const addAuthor = async (newAuthor: Omit<Author, 'id'>, file: File | null) => {
        try {
          console.log(newAuthor);
            const formData = new FormData();
            for (const key in newAuthor) {
                formData.append(key, (newAuthor as any)[key]);
            }
            if (file) {
                formData.append('file', file);
            }

            const response = await axios.put('http://localhost:3001/api/authors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                fetchAuthors(); // Rafraîchir la liste des auteurs après ajout
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'auteur", error);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, [searchQuery, sortBy]);

    return (
        <AuthorsContext.Provider
            value={{
                authors,
                filteredAuthors,
                searchQuery,
                sortBy,
                setSearchQuery,
                setSortBy,
                addAuthor,
                fetchAllBooks,
            }}
        >
            {children}
        </AuthorsContext.Provider>
    );

};

export const useAuthors = () => {
    const context = useContext(AuthorsContext);
    if (!context) throw new Error('useAuthors doit être utilisé dans un AuthorsProvider');
    return context;
};