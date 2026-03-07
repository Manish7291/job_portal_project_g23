import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Always dark mode by default for JOBFLUX
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Only apply the class; glassmorphism works best in dark mode
    document.documentElement.classList.add('dark');
  }, [theme]);

  // Provide a toggle just in case, though dark is locked in via CSS for glassmorphism
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
