import { useState, useEffect, useRef } from "react";
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
import userService from "../services/user.services";

const navLinks = [
  { label: "About", to: "about" },
  { label: "How it's Work", to: "howitswork" },
  { label: "Services", to: "services" },
  { label: "Contact Us", to: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id || user?.userId) {
        try {
          const data = await userService.getUserById(user.id || user.userId);
          setUserData(data);
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      }
    };
    fetchUser();
  }, [user]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <ScrollLink
              to="about"
              smooth
              duration={500}
              offset={-80}
              className="text-xl lg:text-2xl font-bold text-sky-600 cursor-pointer tracking-tight"
            >
              Antar <span className="text-sky-500">Jemput Laundry</span>
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
                className="text-gray-700 hover:text-sky-500 font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            ))}

            {/* Riwayat Pesanan */}
            {user && !isAdmin && (
              <Link
                to="/my-orders"
                className="flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-100 transition-all duration-300 shadow-sm"
              >
                <ClipboardList size={16} />
                Riwayat Pesanan
              </Link>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {isAdmin ? (
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm transition-all duration-300"
              >
                <LayoutDashboard size={16} />
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/order"
                className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm transition-all duration-300"
              >
                <ShoppingBag size={16} />
                Order Now
              </Link>
            )}

            {/* PROFILE DROPDOWN */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  {userData?.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="profile"
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                  ) : (
                    <User size={18} />
                  )}
                  <span className="truncate max-w-[100px]">
                    {userData?.name}
                  </span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fadeIn z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm transition"
                    >
                      <User size={16} /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 shadow-sm transition-all duration-300"
              >
                <User size={16} /> Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-sm">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.label}
                to={link.to}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-sky-500 px-3 py-2 rounded-md font-medium transition"
              >
                {link.label}
              </ScrollLink>
            ))}

            {user && !isAdmin && (
              <Link
                to="/my-orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-sky-50 text-sky-700 px-4 py-2.5 rounded-md font-semibold hover:bg-sky-100 transition"
              >
                <ClipboardList size={18} /> Riwayat Pesanan
              </Link>
            )}

            {isAdmin ? (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-sky-500 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-sky-600 transition"
              >
                <LayoutDashboard size={18} /> Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-sky-500 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-sky-600 transition"
              >
                <ShoppingBag size={18} /> Order Now
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition"
                >
                  <User size={18} /> Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-2.5 rounded-md font-semibold hover:bg-red-100 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition"
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
