import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-primary dark:bg-bgDark p-6 text-center shadow-md">
      <h1 className="text-text text-4xl md:text-5xl font-extrabold leading-tight mb-4 dark:text-bgLight">
        Bibl'ISEN
      </h1>
      <Navbar />
    </header>

  );
};

export default Header;
