'use client';

import React, { useEffect } from 'react';
import { SwipeableDrawer, CircularProgress, Rating } from '@mui/material';
import { useRating } from '../providers/ratingProvider';

interface BookCommentsDrawerProps {
  bookId: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const BookCommentsDrawer: React.FC<BookCommentsDrawerProps> = ({ bookId, open, onClose, onOpen }) => {
  const { comments, fetchComments, isLoading, error } = useRating();

  // Charger les commentaires quand le tiroir s'ouvre pour la première fois
  useEffect(() => {
    if (open) {
      fetchComments(bookId);
    }
  }, [open, bookId, fetchComments]);

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={false}
    >
      <div className="p-6 w-80">
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
          comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{comment.user}</span>
                <Rating value={comment.rating} readOnly size="small" />
              </div>
              {comment.comment && <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>}
            </div>
          ))
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default BookCommentsDrawer;
