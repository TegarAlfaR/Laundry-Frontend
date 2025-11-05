import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  ClipboardList,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "About", to: "about" },
  { label: "How it's Work", to: "howitswork" },
  { label: "Services", to: "services" },
  { label: "Contact Us", to: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <ScrollLink
              to="about"
              smooth
              duration={500}
              offset={-80}
              className="text-xl lg:text-2xl font-bold text-sky-500 cursor-pointer"
            >
              Antar Jemput Laundry
            </ScrollLink>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.label}
                to={link.to}
                smooth
                duration={500}
                offset={-80}
                className="text-gray-600 hover:text-sky-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            ))}

            {/* Riwayat Pesanan */}
            {user && (
              <Link
                to="/my-orders"
                className="flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-200 hover:text-sky-800 shadow-sm transition-all duration-300"
              >
                <ClipboardList size={16} />
                Riwayat Pesanan
              </Link>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Order / Admin */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-600 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <LayoutDashboard size={16} />
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/order"
                className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <ShoppingBag size={16} />
                Order Now
              </Link>
            )}

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <User size={16} /> Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.label}
                to={link.to}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-sky-500 px-3 py-2 rounded-md font-medium"
              >
                {link.label}
              </ScrollLink>
            ))}

            {/* Riwayat Pesanan */}
            {user && (
              <Link
                to="/my-orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full bg-sky-100 text-sky-700 px-4 py-3 rounded-md font-semibold hover:bg-sky-200 hover:text-sky-800 transition-all duration-300 shadow-sm"
              >
                <ClipboardList size={18} /> Riwayat Pesanan
              </Link>
            )}

            {/* Order / Admin */}
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-600 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <LayoutDashboard size={18} /> Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <ShoppingBag size={18} /> Order Now
              </Link>
            )}

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full bg-red-100 text-red-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
