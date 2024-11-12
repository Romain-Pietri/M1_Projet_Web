import React from 'react';
import Link from 'next/link';

const AuthorOfTheDay = ({ id, firstName, lastName, image }: any) => {
  return (
    <div className="w-72 bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-md p-4 max-w-xs">
      <img src={image} alt={`${firstName} ${lastName}`} className="w-32 h-32 object-cover rounded-full mx-auto" />
      <h2 className="text-xl font-bold mt-2 text-center">{firstName} {lastName}</h2>
      <Link href={`/authors/${id}`} className="text-secondary mt-4 inline-block text-sm font-semibold text-center hover:underline">
        Voir plus
      </Link>
    </div>
  );
};

export default AuthorOfTheDay;