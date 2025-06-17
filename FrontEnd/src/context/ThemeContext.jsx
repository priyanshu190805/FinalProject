import React, { createContext, useState } from "react";

export const ThemeDataContext = createContext();

const ThemeContext = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const value = {
    darkMode,
    setDarkMode,
  };

  return (
    <ThemeDataContext.Provider value={value}>
      {children}
    </ThemeDataContext.Provider>
  );
};

export default ThemeContext;
