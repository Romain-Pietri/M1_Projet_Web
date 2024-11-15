import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';

interface DeleteBookButtonProps {
  onDelete: () => void;
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="outlined" color="error" className='dark:bg-buttonDark'>
        Supprimer le livre
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-1 p-1 rounded-lg">
          <div className="p-6 bg-white rounded shadow-md dark:bg-buttonDark w-full">
            <p className='dark:text-bgLight'>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
            <Button onClick={onDelete} color="error">
              Oui, supprimer
            </Button>
            <Button onClick={() => setOpenModal(false)}>Annuler</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteBookButton;
