import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Wrench,
  ShoppingCart,
  LayoutDashboard,
  Home,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

import ManageUsers from "../components/ManageUsers.jsx";
import ManageServices from "../components/ManageServices.jsx";
import ManageTransactions from "../components/ManageTransaction.jsx";
import Report from "../components/Report.jsx";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("transactions");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar (Mobile Top Bar) */}
        <div className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm px-4 py-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sky-600 hover:text-sky-800"
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <h2 className="text-lg font-bold text-sky-700 flex items-center gap-2">
            <LayoutDashboard size={20} /> Admin Panel
          </h2>
          <span className="w-6" /> {/* spacer */}
        </div>

        {/* Main */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <DashboardContent activeView={activeView} />
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari Admin Panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        title: "Berhasil Logout!",
        text: "Sampai jumpa kembali 👋",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => navigate("/login"), 1300);
    }
  };

  const links = [
    {
      label: "Kelola Transaksi",
      icon: <ShoppingCart size={20} />,
      key: "transactions",
    },
    { label: "Kelola Layanan", icon: <Wrench size={20} />, key: "services" },
    { label: "Kelola Pengguna", icon: <Users size={20} />, key: "users" },
    {
      label: "Laporan Transaksi",
      icon: <BarChart3 size={20} />,
      key: "reports",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-md shadow-xl border-r border-sky-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-gray-100">
            <div className="p-2 bg-sky-100 rounded-lg">
              <LayoutDashboard className="text-sky-600" size={22} />
            </div>
            <h2 className="text-xl font-bold text-sky-600">Admin Panel</h2>
          </div>

          <nav className="mt-4 space-y-1">
            {links.map((link) => (
              <SidebarLink
                key={link.key}
                label={link.label}
                icon={link.icon}
                isActive={activeView === link.key}
                onClick={() => {
                  setActiveView(link.key);
                  setSidebarOpen(false);
                }}
              />
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="mt-6 border-t border-gray-100 p-4 space-y-2">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200"
          >
            <Home size={18} />
            <span className="font-medium">Kembali ke Situs</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-3 w-full px-6 py-3 text-sm font-medium rounded-md transition-all duration-200
      ${
        isActive
          ? "bg-sky-100 text-sky-700 border-r-4 border-sky-500"
          : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
      }`}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>
      <span>{label}</span>
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 bg-sky-500 rounded-r-md shadow-sky-300 shadow-sm"></span>
      )}
    </button>
  );
};

const DashboardContent = ({ activeView }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all duration-300">
      {activeView === "transactions" && <ManageTransactions />}
      {activeView === "services" && <ManageServices />}
      {activeView === "users" && <ManageUsers />}
      {activeView === "reports" && <Report />}
    </div>
  );
};

export default AdminDashboard;
