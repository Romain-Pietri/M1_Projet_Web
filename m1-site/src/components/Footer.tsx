import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-bgDark text-center py-6 mt-0">
      <p className="text-text dark:text-bgLight ">© 2024 Bibl'ISEN. Tous droits réservés.</p>
      <div className="mt-4">
        <p className="text-bgLight dark:text-primary hover:underline mx-2">Mentions légales</p>
        <p className="text-bgLight dark:text-primary hover:underline mx-2">Politique de confidentialité</p>
      </div>
    </footer>
  );
};

export default Footer;
