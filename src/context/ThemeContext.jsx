import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './contexts';

function getSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = getSavedTheme();

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [hasManualTheme, setHasManualTheme] = useState(() => {
    return Boolean(getSavedTheme());
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      if (!getSavedTheme()) {
        setIsDarkMode(event.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }

    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, []);

  useEffect(() => {
    if (hasManualTheme) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [hasManualTheme, isDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setHasManualTheme(true);
    setIsDarkMode((previous) => !previous);
  }, []);
  const contextValue = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
