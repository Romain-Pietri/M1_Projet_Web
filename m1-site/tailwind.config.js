/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#faf0e6',
        bgMuted: '#edd6c7',
        primary: '#abc6a5',
        secondary: '#91a88c',
        text: '#696969',
        // sombre
        bgDark: '#696969',
        buttonDark: '#333', 
        textDark: '#f1f1f1', 
      },
    },
  },
  plugins: [],
}

