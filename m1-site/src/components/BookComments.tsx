import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, CircularProgress, Rating } from '@mui/material';
import { useRating } from '../providers/ratingProvider';
import { useParams } from 'next/navigation';

interface BookCommentsDrawerProps {
  bookId: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const BookCommentsDrawer: React.FC<BookCommentsDrawerProps> = ({ open, onClose, onOpen }) => {
  const { comments, fetchComments, isLoading, error } = useRating();
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const { id } = useParams(); // Récupérer l'ID du livre depuis l'URL
  const bookId = Array.isArray(id) ? id[0] : id; // Gérer le type pour que bookId soit une chaîne unique

  useEffect(() => {
    if (open) {
      if (!commentsLoaded) {
        fetchComments(bookId);
        setCommentsLoaded(true);
      }
    } else {
      setCommentsLoaded(false);  // Empêcher le rechargement des commentaires
    
    }
  }, [open, bookId, fetchComments, commentsLoaded]);

  return (
    <SwipeableDrawer anchor="bottom" open={open} onClose={onClose} onOpen={onOpen} disableSwipeToOpen={false}>
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <CircularProgress color="inherit" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">Aucun commentaire pour ce livre.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex-1 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{comment.user}</span>
                  <Rating value={comment.rating} readOnly size="small" />
                </div>
                {comment.comment && <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default BookCommentsDrawer;
