'use client';

import React, { useState } from 'react';
import { Drawer, Rating, Button, TextField } from '@mui/material';
import { useRating } from '../providers/ratingProvider'
import { useParams } from 'next/navigation';

interface AddRatingDrawerProps {
  bookId: string;
  open: boolean;
  onClose: () => void; 
  onAddRating: (newRating: {user: string, rating: number, comment?: string}) => void;
}

const AddRatingDrawer: React.FC<AddRatingDrawerProps> = ({ open, onClose }) => {
  const { addRating, isLoading, error } = useRating();
  const [newRating, setNewRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>(''); 
  const [userName, setUserName] = useState<string>(''); 

  const { id } = useParams(); // Récupérer l'ID du livre depuis l'URL
  const bookId = Array.isArray(id) ? id[0] : id; // Gérer le type pour que bookId soit une chaîne unique
  // log le bookId
  const handleAddRating = async () => {
    if (newRating > 0 && userName.trim()) {
      await addRating(bookId, userName, newRating, newComment); 
      onClose();  // Fermer le Drawer après ajout
    } else {
      alert('Veuillez donner une note et entrer un nom.');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="p-6 w-80 h-full dark:bg-buttonDark">
        <h2 className="text-2xl mb-4 dark:text-primary">Ajouter un commentaire</h2>

        {/* Champ pour évaluer la note */}
        <Rating
          value={newRating}
          onChange={(e, newValue) => setNewRating(newValue || 0)} 
          //mettre le contour en blanc en dark mode
            className='dark:text-secondary [&_.MuiRating-iconEmpty]:text-white'
          />

        {/* Champ pour le nom de l'utilisateur */}
        <TextField
          label="Nom d'utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} 
          fullWidth
          variant="outlined"
          className="mb-4 dark:bg-bgLight rounded-lg"
        />

        {/* Champ pour le commentaire (facultatif) */}
        <TextField
          label="Commentaire (optionnel)"
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} 
          fullWidth
          variant="outlined"
          className="mb-4 dark:bg-bgLight rounded-lg"
        />

        {/* Bouton pour soumettre le formulaire */}
        <Button onClick={handleAddRating} variant="contained" color="primary" disabled={isLoading} className='w-full bg-primary text-text hover:bg-secondary rounded-lg'>
          {isLoading ? 'En cours...' : 'Ajouter'}
        </Button>

        {/* Affichage des erreurs */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </div>
    </Drawer>
  );
};

export default AddRatingDrawer;
