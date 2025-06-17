import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import OrderModal from "./OrderModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    setIsLoggedIn(Boolean(user));
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    Cookies.remove("user", { path: "/" });
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-10 lg:mx-[80px] py-4 flex items-center justify-between">
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            offset={-80}
            className="text-2xl font-bold text-[#21B7E2] cursor-pointer hover:scale-110 duration-300"
          >
            Antar Jemput Laundry
          </ScrollLink>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-blue-500">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className="hidden lg:flex gap-6 items-center">
            {["About", "How it's Work", "Services", "Contact Us"].map(
              (label) => (
                <ScrollLink
                  key={label}
                  to={label.toLowerCase().replace(/ /g, "")}
                  smooth
                  duration={500}
                  offset={-80}
                  className="cursor-pointer text-[#21B7E2] transition duration-300 hover:text-blue-500 hover:scale-110"
                >
                  {label}
                </ScrollLink>
              )
            )}

            <button
              onClick={toggleModal}
              className="bg-[#21B7E2] text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:scale-110 transition duration-300"
            >
              Order Now
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border border-[#21B7E2] text-[#21B7E2] px-4 py-2 rounded-md hover:bg-[#21B7E2] hover:text-white transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-white">
            {["About", "How it's Work", "Services", "Contact Us"].map(
              (label) => (
                <ScrollLink
                  key={label}
                  to={label.toLowerCase().replace(/ /g, "")}
                  smooth
                  duration={500}
                  offset={-80}
                  className="text-blue-500 border-b border-gray-200 pb-2 transition duration-300 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </ScrollLink>
              )
            )}

            <button
              onClick={() => {
                toggleModal();
                setIsOpen(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            >
              New Order
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Order Modal */}
      {isModalOpen && <OrderModal isOpen={isModalOpen} onClose={toggleModal} />}
    </>
  );
}
