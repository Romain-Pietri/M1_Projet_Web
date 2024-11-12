import React from 'react';
import './App.css';
import BookOfDay from '../components/BookOfDay';
import AuthorOfDay from '../components/AuthorOfDay';

export default function HomePage() {
    // En attendant de récupérer les données de l'API
  const books = [
    { id: '1', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', image: 'https://via.placeholder.com/150', rating: 4.7 },
    { id: '2', title: 'Les Misérables', author: 'Victor Hugo', image: 'https://via.placeholder.com/150', rating: 4.8 },
    { id: '3', title: '1984', author: 'George Orwell', image: 'https://via.placeholder.com/150', rating: 4.6 },
  ];
  
    const authors = [
      { id: '1', firstName: 'Victor', lastName: 'Hugo', image: 'https://via.placeholder.com/150' },
      { id: '2', firstName: 'Antoine', lastName: 'de Saint-Exupéry', image: 'https://via.placeholder.com/150' },
      { id: '3', firstName: 'George', lastName: 'Orwell', image: 'https://via.placeholder.com/150' },
    ];

  return (
    <div className="dark:bg-buttonDark dark:text-white min-h-screen">
      <main className="p-8 text-center text-text dark:text-bgLight">
        <p className="text-3xl mb-7">Bienvenue sur notre site dédié aux livres et aux auteurs !</p>
 
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Livres du jour</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {books.map((book) => (
                  <BookOfDay 
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    image={book.image}
                    rating={book.rating}
                  />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Auteurs du jour</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {authors.map((author) => (
                  <AuthorOfDay
                    key={author.id}
                    id={author.id}
                    firstName={author.firstName}
                    lastName={author.lastName}
                    image={author.image}
                  />
              ))}
            </div>
          </section>
      </main>
    </div>
  );
}

