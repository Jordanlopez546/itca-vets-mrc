import Sidebar from "./sidebar";
import DashboardHeader from "./dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DashboardHeader />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
