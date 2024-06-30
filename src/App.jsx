import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Header from './components/Header.jsx';
import router from './router.jsx';
import './App.css';
import './i18n'; // Import i18n configuration

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const darkModeClass = isDarkMode ? 'dark-mode' : '';

  return (
    <div className={`app ${darkModeClass}`}>
      <main>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
