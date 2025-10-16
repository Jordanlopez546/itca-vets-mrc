import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Clock, X } from "lucide-react";
import { SidebarProps } from "../../types/interfaces/sidebar";

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();

  const links = [
    { name: "Overview", href: "/", icon: <Home size={18} /> },
    { name: "History", href: "/history", icon: <Clock size={18} /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed z-50 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 h-screen w-64 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            PneumoScan
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 dark:text-gray-300"
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-5 space-y-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
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
      </aside>
    </>
  );
};

export default Sidebar;
