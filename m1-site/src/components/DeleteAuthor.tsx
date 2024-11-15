import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';

interface DeleteAuthorProps {
  onDelete: () => void;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAuthor: React.FC<DeleteAuthorProps> = ({ onDelete, showDeleteModal, setShowDeleteModal }) => {
  return (
    <>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-gray-800 shadow-lg p-6 rounded-lg">
          <div className="p-6 bg-white rounded shadow-md">
            <p>Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
            <Button onClick={onDelete} color="error">
              Oui, supprimer
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Annuler</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAuthor;
