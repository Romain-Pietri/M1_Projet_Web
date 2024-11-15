import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface EditAuthorProps {
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  editName: string;
  setEditName: React.Dispatch<React.SetStateAction<string>>;
  editBiography: string;
  setEditBiography: React.Dispatch<React.SetStateAction<string>>;
  handleEditAuthor: () => void;
}

const EditAuthor: React.FC<EditAuthorProps> = ({
  showEditModal,
  setShowEditModal,
  editName,
  setEditName,
  editBiography,
  setEditBiography,
  handleEditAuthor,
}) => {
  return (
    <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
      <Box className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Modifier l'Auteur</h2>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Nom"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <textarea
          value={editBiography}
          onChange={(e) => setEditBiography(e.target.value)}
          placeholder="Biographie"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <Button
          onClick={handleEditAuthor} // Cette fonction est passée du parent
          className="p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg w-full"
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default EditAuthor;
