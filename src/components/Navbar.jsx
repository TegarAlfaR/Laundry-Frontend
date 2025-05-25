import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import OrderModal from "./OrderModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
            {[
              { label: "About", to: "about" },
              { label: "How it's Work", to: "howitswork" },
              { label: "Services", to: "services" },
              { label: "Contact Us", to: "contact" },
            ].map((link) => (
              <ScrollLink
                key={link.label}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer text-[#21B7E2] transition duration-300 hover:text-blue-500 hover:scale-110"
              >
                {link.label}
              </ScrollLink>
            ))}
            <button
              onClick={toggleModal}
              className="bg-[#21B7E2] text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:scale-110 transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-white">
            {[
              { label: "About", to: "about" },
              { label: "How it's Work", to: "howitswork" },
              { label: "Services", to: "services" },
              { label: "Contact Us", to: "contact" },
            ].map((link) => (
              <ScrollLink
                key={link.label}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-blue-500 border-b border-gray-200 pb-2 transition duration-300 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
            <button
              onClick={() => {
                toggleModal();
                setIsOpen(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            >
              New Order
            </button>
          </div>
        )}
      </nav>

      {/* Order Modal */}
      {isModalOpen && <OrderModal isOpen={isModalOpen} onClose={toggleModal} />}
    </>
  );
}
