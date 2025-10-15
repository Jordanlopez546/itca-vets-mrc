import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Home, Clock, Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const links = [
    { name: "Overview", href: "/", icon: <Home size={18} /> },
    { name: "History", href: "/history", icon: <Clock size={18} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-10">
          PneumoScan
        </h1>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                router.pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-6 border-t dark:border-gray-700 flex justify-between items-center">
        <span className="text-sm">Theme</span>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
