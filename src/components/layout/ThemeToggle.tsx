import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react"; // Si usas lucide-react

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card hover:bg-accent transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
};
