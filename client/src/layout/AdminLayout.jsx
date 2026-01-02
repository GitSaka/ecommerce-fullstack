import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/Sidebar";
import Topbar from "../admin/components/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
