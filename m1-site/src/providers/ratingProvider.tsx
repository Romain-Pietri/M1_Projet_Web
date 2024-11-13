import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { Comment } from '../models/rating.model'; // Assurez-vous que ce modèle existe

interface RatingContextType {
  comments: Comment[]; // Liste des commentaires
  addRating: (bookId: string, user: string, rating: number, comment?: string) => Promise<void>;
  fetchComments: (bookId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

interface RatingProviderProps {
  children: ReactNode;
}

export const RatingProvider: React.FC<RatingProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les commentaires d'un livre spécifique
  const fetchComments = async (bookId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/ratings?bookId=${bookId}`);
      setComments(response.data); // Mettre à jour l'état avec les commentaires récupérés
    } catch (err) {
      setError('Erreur lors de la récupération des commentaires.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour ajouter un nouveau commentaire
  const addRating = async (bookId: string, user: string, rating: number, comment: string = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/ratings', { bookId, user, rating, comment });
      if (response.status === 200) {
        // Rafraîchir les commentaires après l'ajout du nouveau commentaire
        fetchComments(bookId);
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout du commentaire.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RatingContext.Provider
      value={{
        comments,
        addRating,
        fetchComments,
        isLoading,
        error,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = (): RatingContextType => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating doit être utilisé dans un RatingProvider');
  }
  return context;
};
