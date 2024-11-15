// AuthorDetailPageContent.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { AuthorProvider, useAuthor } from '../../../providers/AuthorDetailProvider';
import { BooksProvider, useBooks } from '../../../providers/BookProvider';
import AddBook from '../../../components/AddBook';
import EditAuthor from '../../../components/EditAuthor';  
import DeleteAuthor from '../../../components/DeleteAuthor';  
import '../../App.css';

const AuthorDetailPageContent = () => {
  const { id } = useParams();
  const {
    author,
    books,
    loading,
    error,
    editName,
    editBiography,
    setEditName,
    setEditBiography,
    fetchAuthorDetails,
    fetchBooks,
    handleDeleteAuthor,
    handleDeleteBook,
    handleEditAuthor,
  } = useAuthor();

  const { addBook } = useBooks();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (author?.name) {
      fetchBooks(author.name);
    }
  }, [author]);

  const handleEditAuthorWithClose = async () => {
    await handleEditAuthor();
    setShowEditModal(false);
  };

  const handleAddBookWithRefresh = async (newBook: any) => {
    await addBook(newBook);
    if (author?.name) {
      fetchBooks(author.name);
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 mt-8 max-w-2xl mx-auto">
      <div className="flex items-center space-x-8">
        {author?.imageUrl && (
          <img src={author.imageUrl} alt={author.name} className="w-48 h-64 object-cover rounded-lg" />
        )}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{author?.name}</h1>
          <p className="text-lg text-center md:text-left">{author?.biography}</p>
          <Button onClick={() => setShowEditModal(true)} className="p-2 bg-primary text-text hover:bg-secondary rounded-lg">
            Modifier
          </Button>
          <Button onClick={() => setShowModal(true)} className="p-2 bg-primary text-text hover:bg-secondary rounded-lg">
            Ajouter un Livre
          </Button>
          <Button onClick={() => setShowDeleteModal(true)} className="p-2 bg-primary text-text hover:bg-secondary rounded-lg">
            Supprimer
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8">Livres</h2>
      <ul className="list-disc list-inside">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between items-center p-1">
            <a href={`/books/${book.id}`} className="text-secondary hover:underline">
              {book.title}
            </a>
            <Button
              onClick={() => handleDeleteBook(book.id)}
              className="p-2 bg-primary text-text hover:bg-secondary rounded-lg h-8"
            >
              Supprimer
            </Button>
          </li>
        ))}
      </ul>

      {/* Modals */}

      {/* Modal de suppression de l'auteur */}
 <DeleteAuthor
        onDelete={handleDeleteAuthor}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <AddBook showModal={showModal} closeModal={() => setShowModal(false)} onAddBook={handleAddBookWithRefresh} />

      {/* Modal d'édition de l'auteur */}
      <EditAuthor
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editName={editName}
        setEditName={setEditName}
        editBiography={editBiography}
        setEditBiography={setEditBiography}
        handleEditAuthor={handleEditAuthorWithClose}
      />
    </div>
  );
};

const AuthorDetailPage = () => (
  <BooksProvider>
    <AuthorProvider>
      <AuthorDetailPageContent />
    </AuthorProvider>
  </BooksProvider>
);

export default AuthorDetailPage;
