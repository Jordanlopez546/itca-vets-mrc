import { useState } from "react";
import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <DashboardHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="p-6 text-gray-900 dark:text-gray-100">{children}</div>
      </main>
    </div>
  );
}
