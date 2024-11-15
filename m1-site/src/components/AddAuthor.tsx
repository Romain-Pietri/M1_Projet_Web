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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-text dark:text-bgLight border-gray-300 dark:border-gray-600">
            <div className="bg-white dark:bg-buttonDark p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-text dark:text-primary">Ajouter un auteur</h2>
                <form onSubmit={handleAddAuthor}>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="name"
                            value={newAuthor.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                            className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                            className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text dark:bg-bgDark dark:placeholder-gray-400"
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
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-bgDark dark:placeholder-gray-400"
                        />
                    </div>
                    <button onClick={closeModal}
                            className="px-4 py-2 bg-primary text-text rounded-lg hover:bg-secondary transition mr-2 duration-300">
                        Annuler
                    </button>
                    <button type="submit"
                            className="px-4 py-2 bg-bgLight text-text hover:bg-bgMuted rounded-lg transition duration-300 dark:bg-bgDark dark:text-gray-200 dark:hover:bg-gray-500">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAuthor;