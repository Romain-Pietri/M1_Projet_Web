import React from 'react';
import Link from 'next/link';

const BookOfTheDay = ({ id, title, author, image, rating }: any) => {
  return (
    <div className="w-72 bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-md p-4 max-w-xs">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-sm text-secondary">par {author}</p>
      <p className="text-primary mt-1">Note : {rating}/5</p>
      <Link href={`/books/${id}`} className="text-secondary mt-4 inline-block text-sm font-semibold hover:underline">
        Voir plus
      </Link>
    </div>
  );
};

export default BookOfTheDay;
