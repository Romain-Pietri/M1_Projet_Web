'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookDetailProvider, useBookDetail } from '../../../providers/BookDetailProvider';
import DeleteBookButton from '../../../components/DeleteBookButton';
import { CircularProgress, Button } from '@mui/material';
import AddCommentDrawer from '../../../components/AddRatingDrawer';  // Assurez-vous d'importer AddCommentDrawer
import '../../App.css';

const BookDetailContent = () => {
    const { book, loading, error, deleteBook } = useBookDetail();
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);  // State pour ouvrir/fermer le Drawer

    const handleDelete = async () => {
        await deleteBook();
        router.push('/books');
    };

    const handleOpenDrawer = () => {
        setOpenDrawer(true);  // Ouvrir le Drawer
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);  // Fermer le Drawer
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
        <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-8">
                <img src='https://via.placeholder.com/150' alt={book?.title} className="w-48 h-64 object-cover rounded-lg" />
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold text-center md:text-left">{book?.title}</h1>
                    <p className="text-lg text-center md:text-left">Auteur: {book?.author}</p>
                    <p className="text-md text-center md:text-left">Date de publication: {book?.publicationDate}</p>
                    <p className="text-lg text-center md:text-left mb-2">Prix : {book?.price} €</p>
                    <DeleteBookButton onDelete={handleDelete} />

                    {/* Bouton pour ajouter un commentaire */}
                    <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
                        Ajouter un commentaire
                    </Button> 
                </div>
            </div>

        </div>
    );
};

const BookDetailPage = () => {
    const { id } = useParams();

    // S'assurer que l'ID est bien une chaîne de caractères
    const bookId = Array.isArray(id) ? id[0] : id;

    if (!bookId) return <div>Erreur : ID non trouvé.</div>;

    return (
        <BookDetailProvider id={bookId}>
            <BookDetailContent />
        </BookDetailProvider>
    );
};

export default BookDetailPage;
