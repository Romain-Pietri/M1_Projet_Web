'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
    price?: number;
    imageUrl?: string;

}

interface BookDetailContextType {
    book: Book | null;
    loading: boolean;
    error: string | null;
    fetchBookDetails: (bookId: string) => Promise<void>;
    deleteBook: () => Promise<void>;
}

const BookDetailContext = createContext<BookDetailContextType | undefined>(undefined);

export const BookDetailProvider: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookDetails = async (bookId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);
            setBook(response.data);
            setError(null);
        } catch (err) {
            setError("Erreur lors de la récupération des détails du livre.");
        } finally {
            setLoading(false);
        }
    };

    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/books/${id}`);
        } catch (err) {
            setError("Erreur lors de la suppression du livre.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchBookDetails(id);
        }
    }, [id]);

    return (
        <BookDetailContext.Provider value={{ book, loading, error, fetchBookDetails, deleteBook }}>
            {children}
        </BookDetailContext.Provider>
    );
};

export const useBookDetail = (): BookDetailContextType => {
    const context = useContext(BookDetailContext);
    if (!context) {
        throw new Error('useBookDetail doit être utilisé dans un BookDetailProvider');
    }
    return context;
};
