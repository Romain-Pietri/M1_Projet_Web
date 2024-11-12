// components/CommentsDrawer.tsx
import React, { useState } from 'react';
import { Drawer, Rating, Button, TextField } from '@mui/material';

interface Comment {
  id: string;
  rating: number;
  text?: string;
  createdAt: string;
}

interface CommentsDrawerProps {
  comments: Comment[];
  onAddComment: (rating: number, text: string) => void;
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ comments, onAddComment }) => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState({ rating: 0, text: '' });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedComments = comments.sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleAddComment = () => {
    onAddComment(newComment.rating, newComment.text);
    setNewComment({ rating: 0, text: '' });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Voir les avis
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="p-6 w-80">
          <h2 className="text-2xl mb-4">Avis</h2>
          <div className="flex justify-between">
            <p>Tri :</p>
            <Button variant="outlined" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? 'Ascendant' : 'Descendant'}
            </Button>
          </div>
          {sortedComments.map((comment) => (
            <div key={comment.id} className="border-t py-4">
              <Rating value={comment.rating} readOnly />
              {comment.text && <p>{comment.text}</p>}
              <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
          <h3 className="mt-6 text-xl">Ajouter un avis</h3>
          <Rating
            value={newComment.rating}
            onChange={(e, newValue) => setNewComment({ ...newComment, rating: newValue ?? 0 })}
          />
          <TextField
            label="Commentaire (optionnel)"
            multiline
            rows={3}
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            fullWidth
            variant="outlined"
            className="my-4"
          />
          <Button onClick={handleAddComment} variant="contained" color="primary">
            Ajouter
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default CommentsDrawer;
