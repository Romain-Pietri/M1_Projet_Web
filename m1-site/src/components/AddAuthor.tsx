'use client';
import React, { useState } from 'react';
import { Author } from '../models/author.model';
interface AddAuthorProps {
    showModal: boolean;
    closeModal: () => void;
    onAddAuthor: (newAuthor: Omit<Author, 'id'>, file?: File) => Promise<void>;
}

const AddAuthor: React.FC<AddAuthorProps> = ({ showModal, closeModal, onAddAuthor }) => {
    const [newAuthor, setNewAuthor] = useState({ name: '', birthDate: '', deathDate: '', books: [], isAlive: false });
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAuthor(prevAuthor => ({ ...prevAuthor, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewAuthor(prevAuthor => ({ ...prevAuthor, [name]: checked, deathDate: checked ? '' : prevAuthor.deathDate }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddAuthor = async (e: React.FormEvent) => {
        e.preventDefault();
        await onAddAuthor(newAuthor, selectedFile);
        closeModal();
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Ajouter un auteur</h2>
                <form onSubmit={handleAddAuthor}>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="name"
                            value={newAuthor.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label>Date de naissance:</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={newAuthor.birthDate}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label>Date de décès:</label>
                        <input
                            type="date"
                            name="deathDate"
                            value={newAuthor.deathDate}
                            onChange={handleInputChange}
                            disabled={newAuthor.isAlive}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isAlive"
                                checked={newAuthor.isAlive}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            Encore en vie
                        </label>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>
                    <button onClick={closeModal}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                        Annuler
                    </button>
                    <button type="submit"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAuthor;