import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-10 lg:mx-[80px] py-4 flex items-center justify-between">
          <Link to="about" smooth={true} duration={500} offset={-80}>
            <h1 className="text-2xl font-bold text-[#21B7E2] cursor-pointer hover:scale-110 duration-300">
              Antar Jemput Laundry
            </h1>
          </Link>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-blue-500">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <div className="hidden lg:flex gap-6 items-center">
            {[
              { label: "About", href: "#about" },
              { label: "How it's Work", href: "#howitswork" },
              { label: "Services", href: "#services" },
              { label: "Contact Us", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer text-[#21B7E2] transition duration-300 hover:text-blue-500 hover:scale-110"
              >
                {link.label}
              </a>
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
              { label: "About", href: "#about" },
              { label: "How it's Work", href: "#howitswork" },
              { label: "Services", href: "#services" },
              { label: "Contact Us", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-blue-500 border-b border-gray-200 pb-2 transition duration-300 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-80 pointer-events-none"></div>
          <div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-lg shadow-xl pointer-events-auto">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#21B7E2]">
              Form Order Laundry
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nama</label>
                <input
                  type="text"
                  placeholder="Masukkan nama"
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  placeholder="Masukkan alamat"
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Waktu Pengambilan</label>
                <input
                  type="datetime-local"
                  className="border border-gray-300 px-4 py-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Kategori Laundry</label>
                <select className="border border-gray-300 px-4 py-2 rounded w-full">
                  <option value="">Pilih Kategori Laundry</option>
                  <option value="cuci+setrika">Cuci + Setrika</option>
                  <option value="cuci">Cuci</option>
                  <option value="setrika">Setrika</option>
                  <option value="boneka">Boneka</option>
                  <option value="karpet">Karpet</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Durasi</label>
                <select className="border border-gray-300 px-4 py-2 rounded w-full">
                  <option value="">Pilih Paket</option>
                  <option value="cepat">Cepat Kilat (sehari selesai)</option>
                  <option value="normal">Normal (3 hari)</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#21B7E2] text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}


    </>
  );
}
