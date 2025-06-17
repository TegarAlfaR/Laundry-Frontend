import { useEffect, useState } from "react";
// 1. Tambahkan 'Link' dari react-router-dom dan ikon 'Home'
import { Link } from "react-router-dom";
import {
  Users,
  Wrench,
  ShoppingCart,
  LayoutDashboard,
  Home,
} from "lucide-react";

// Impor komponen anak
import ManageUsers from "../components/ManageUsers.jsx";
import ManageServices from "../components/ManageServices.jsx";
import ManageTransactions from "../components/ManageTransaction.jsx";

// Komponen Utama Dashboard
const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("transactions");

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-8">
        <DashboardContent activeView={activeView} />
      </main>
    </div>
  );
};

// Komponen Sidebar
const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-3">
          <LayoutDashboard />
          Admin Panel
        </h2>
      </div>
      <nav className="mt-6">
        <SidebarLink
          label="Kelola Transaksi"
          icon={<ShoppingCart size={20} />}
          isActive={activeView === "transactions"}
          onClick={() => setActiveView("transactions")}
        />
        <SidebarLink
          label="Kelola Layanan"
          icon={<Wrench size={20} />}
          isActive={activeView === "services"}
          onClick={() => setActiveView("services")}
        />
        <SidebarLink
          label="Kelola Pengguna"
          icon={<Users size={20} />}
          isActive={activeView === "users"}
          onClick={() => setActiveView("users")}
        />

        {/* 2. TAMBAHKAN TOMBOL KEMBALI DI SINI */}
        <div className="mt-6 pt-6 border-t border-gray-200 mx-6">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-colors duration-200 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Home size={20} />
            <span className="font-medium text-sm">Kembali ke Situs</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

// Komponen SidebarLink
const SidebarLink = ({ label, icon, isActive, onClick }) => {
  const baseClasses =
    "flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors duration-200";
  const activeClasses =
    "bg-sky-100 text-sky-600 border-r-4 border-sky-500 font-semibold";
  const inactiveClasses = "text-gray-600 hover:bg-gray-50";

  return (
    <a
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

// Komponen Konten Dashboard
const DashboardContent = ({ activeView }) => {
  if (activeView === "transactions") {
    return <ManageTransactions />;
  }
  if (activeView === "services") {
    return <ManageServices />;
  }
  if (activeView === "users") {
    return <ManageUsers />;
  }
  return null;
};

export default AdminDashboard;
