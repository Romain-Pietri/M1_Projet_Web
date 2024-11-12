import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';

interface DeleteBookButtonProps {
  onDelete: () => void;
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="outlined" color="error">
        Supprimer le livre
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="p-6 bg-white rounded shadow-md">
          <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
          <Button onClick={onDelete} color="error">
            Oui, supprimer
          </Button>
          <Button onClick={() => setOpenModal(false)}>Annuler</Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteBookButton;
