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
        className={`fixed z-50 bg-white dark:bg-[#0a0a0ae0] shadow-md transition-transform duration-300 h-screen w-64 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center dark:border-gray-700">
          <img src="/PNEUOMONIASCAN.png" alt="Logo" className="h-8 mx-auto" />
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 dark:text-gray-300"
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-5 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex dark:text-[#acacac] text-[#000000b2] items-center gap-3 px-4 py-2 rounded-lg transition ${
                router.pathname === link.href
                  ? "dark:bg-[#1d1d1d] bg-[#e4794b54] text-sm"
                  : "text-sm hover:bg-[#e4794b3b] dark:hover:bg-[#131313]"
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
