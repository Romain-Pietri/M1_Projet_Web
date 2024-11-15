'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookDetailProvider, useBookDetail } from '../../../providers/BookDetailProvider';
import { RatingProvider, useRating } from '../../../providers/ratingProvider';
import DeleteBookButton from '../../../components/DeleteBookButton';
import { CircularProgress, Button } from '@mui/material';
import AddRatingDrawer from '../../../components/AddRatingDrawer'; 
import BookComments from '../../../components/BookComments';
import '../../App.css';

const BookDetailContent = () => {
    const { book, loading, error, deleteBook } = useBookDetail();
    const router = useRouter();
    const [openAddDrawer, setOpenAddDrawer] = useState(false);  // State pour ouvrir/fermer le Drawer
    const [openComments, setOpenComments] = useState(false);  // State pour ouvrir/fermer le Drawer

    const handleDelete = async () => {
        await deleteBook();
        router.push('/books');
    };

    const handleCloseAddDrawer = () => {
        setOpenAddDrawer(false);  // Fermer le Drawer
    };

    const handleOpenComments = () => {
        setOpenComments(true);  // Ouvrir le Drawer
    }

    const handleCloseComments = () => {
        setOpenComments(false);  // Fermer le Drawer
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
        <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 mt-8 max-w-2xl mx-auto">
            <div className="flex items-center space-x-8">
                <img src={ book?.imageUrl } alt={book?.title} className="w-48 h-64 object-cover rounded-lg" />
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold text-center md:text-left">{book?.title}</h1>
                    <p className="text-lg text-center md:text-left">Auteur: {book?.author}</p>
                    <p className="text-md text-center md:text-left">Date de publication: {book?.publicationDate}</p>
                    <p className="text-lg text-center md:text-left mb-2">Prix : {book?.price} €</p>

                    {/* Bouton pour afficher les commentaires */}
                    <button onClick={handleOpenComments} className="p-2 bg-primary text-text hover:bg-secondary rounded-lg">
                      Voir les commentaires
                    </button>

                    {/* Composant pour afficher les commentaires */}
                    <BookComments bookId='' open={openComments} onClose={handleCloseComments} onOpen={handleOpenComments}/>


                    <button onClick={() => setOpenAddDrawer(true)} className="p-2 bg-primary text-text hover:bg-secondary rounded-lg">
                      Ajouter une note
                    </button>

                    {/* Bouton pour ajouter un commentaire */}
                    <AddRatingDrawer bookId='' open={openAddDrawer} onClose={handleCloseAddDrawer} onAddRating={useRating}/>

                    <DeleteBookButton onDelete={handleDelete}/>
                    
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
        <RatingProvider>
            <BookDetailProvider id={bookId}>
                <BookDetailContent />
            </BookDetailProvider>
        </RatingProvider>
    );
};

export default BookDetailPage;
