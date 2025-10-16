import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";

export default function DashboardHeader({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="cursor-pointer">
            <Menu className="text-gray-700 dark:text-gray-200" size={22} />
          </button>
          {!isSidebarOpen && (
            <Image
              width={200}
              height={200}
              src="/PNEUOMONIASCAN.svg"
              alt="Logo"
              className="h-8"
            />
          )}
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
    <header className="w-full bg-[#e1e2ca] dark:bg-[#1a1a1a] shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex flex-1 items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="cursor-pointer hover:bg-[#d1d2ba] dark:hover:bg-[#1a1a1a] p-2 rounded-lg transition"
        >
          <Menu className="text-[#E4794B]" size={22} />
        </button>
        {!isSidebarOpen && (
          <div className="relative h-8 w-auto mx-auto min-w-[100px]">
            <Image
              fill
              alt="Logo"
              className="object-contain"
              src="/PNEUOMONIASCAN.png"
            />
          </div>
        )}
      </div>

      <div className="flex items-center w-fit gap-4">
        <span className="text-sm text-[#202020] dark:text-white font-medium">
          Team ITCA Vets
        </span>
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 text-[#E4794B] cursor-pointer dark:bg-[#e06a371e] transition hover:bg-gray-300 dark:hover:bg-[#e06a372a]"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
