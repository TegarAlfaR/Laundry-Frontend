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

const navLinks = [
  { label: "About", to: "about" },
  { label: "How it's Work", to: "howitswork" },
  { label: "Services", to: "services" },
  { label: "Contact Us", to: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAdmin ? (
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-lg transition-all duration-300"
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

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                >
                  <User size={16} />
                  <span>Halo, {user.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-2 z-50 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/my-orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <ClipboardList size={16} /> Riwayat Pesanan
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>

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

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
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
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-2 space-y-3">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left bg-indigo-600 text-white px-3 py-3 rounded-md font-medium"
                  >
                    <LayoutDashboard size={18} /> Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left bg-sky-500 text-white px-3 py-3 rounded-md font-medium"
                  >
                    <ShoppingBag size={18} /> Order Now
                  </Link>
                )}

                {user ? (
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <p className="px-1 pb-2 font-semibold text-gray-800">
                      Halo, {user.username}
                    </p>
                    <Link
                      to="/my-orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <ClipboardList size={18} /> Riwayat Pesanan
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md font-medium text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left bg-gray-100 text-gray-800 px-3 py-3 rounded-md font-medium"
                  >
                    <User size={18} /> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
