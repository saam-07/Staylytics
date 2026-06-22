import { createContext, useContext, useState, useEffect} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
 const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem("staylytics-theme");
  return saved ? saved === "dark" : true;
});

  useEffect(() => {
    localStorage.setItem("staylytics-theme", isDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}


export const useTheme = () => useContext(ThemeContext);
