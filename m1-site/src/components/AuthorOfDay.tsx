'use client';

import React from 'react';
import Link from 'next/link';

interface AuthorOfTheDayProps {
    id: string;
    firstName?: string;
    lastName?: string;
    name: string;
    image?: string;
    bookCount: number;
    Note: number;
}

const AuthorOfTheDay: React.FC<AuthorOfTheDayProps> = ({ id, firstName, lastName, name, image, bookCount, Note }) => {
    const displayNote = isNaN(Note) ? 'Aucune note' : Note.toFixed(1);

    return (
        <div className="w-72 bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-md p-4 max-w-xs">
            <img src={image} alt={`${firstName} ${lastName}`} className="w-32 h-32 object-cover rounded-full mx-auto" />
            <h2 className="text-xl font-bold mt-2 text-center">{firstName} {lastName}</h2>
            <p className="text-center mt-2">{name}</p>
            <p className="text-center mt-2">Nombre de livres: {bookCount}</p>
            <p className="text-center mt-2">Note Moyenne : {displayNote}</p>
            <Link href={`/authors/${id}`} className="text-secondary mt-4 inline-block text-sm font-semibold text-center hover:underline">
                Voir plus
            </Link>
        </div>
    );
};

export default AuthorOfTheDay;