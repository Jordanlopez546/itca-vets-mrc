import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar}>
            <Menu className="text-gray-700 dark:text-gray-200" size={22} />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Team ITCA Vets
          </span>
          <div className="p-2 w-10 h-10"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar}>
          <Menu className="text-gray-700 dark:text-gray-200" size={22} />
        </button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Team ITCA Vets
        </span>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
