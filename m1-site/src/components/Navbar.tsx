'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fonction pour changer le mode de la page
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Appliquer ou supprimer la classe 'dark' sur le body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Ajouter la classe 'dark' sur l'élément <html>
    } else {
      document.documentElement.classList.remove('dark'); // Retirer la classe 'dark'
    }
  }, [isDarkMode]);
  
  return (
    <nav className="text-text p-4 flex gap-4">
      <Link 
        href="/" 
        className="bg-bgLight text-text hover:bg-bgMuted border border-transparent rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 dark:bg-buttonDark dark:text-white dark:hover:bg-black"
      >
        Accueil
      </Link>
      <Link 
        href="/books" 
        className="bg-bgLight text-text hover:bg-bgMuted border border-transparent rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 dark:bg-buttonDark dark:text-white dark:hover:bg-black"
      >
        Livres
      </Link>
      <Link 
        href="/authors"  
        className="bg-bgLight text-text hover:bg-bgMuted border border-transparent rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 dark:bg-buttonDark dark:text-white dark:hover:bg-black"
      >
        Auteurs
      </Link>

      <button
        onClick={toggleDarkMode}
        className="ml-auto p-2 bg-bgLight dark:bg-buttonDark text-text dark:text-bgLight hover:bg-bgMuted dark:hover:bg-black rounded-lg transition duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 "
      >
        {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
      </button>
    </nav>
  );
};

export default Navbar;
