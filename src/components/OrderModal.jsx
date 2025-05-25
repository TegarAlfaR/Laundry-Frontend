import { useState } from "react";
import { X } from "lucide-react";
import createOrder from "../services/order.services";

export default function OrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    user_name: "",
    address: "",
    pickup_time: "",
    laundry_category: "",
    quantity: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await createOrder(formData);
      onClose();
    } catch (err) {
      setError("Gagal membuat order. " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-80 pointer-events-none"></div>
      <div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-lg shadow-xl pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-[#21B7E2]">
          Form Order Laundry
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <input
              name="user_name"
              type="text"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Masukkan nama"
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Alamat
            </label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat"
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Jadwal Pickup Barang
            </label>
            <input
              name="pickup_time"
              type="datetime-local"
              value={formData.pickup_time}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Kategori Laundry
            </label>
            <select
              name="laundry_category"
              value={formData.laundry_category}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            >
              <option value="">Pilih Kategori Laundry</option>
              <option value="cuci-setrika">Cuci + Setrika</option>
              <option value="cuci">Cuci</option>
              <option value="setrika">Setrika</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity (kg)
            </label>
            <input
              name="quantity"
              type="number"
              min="1"
              max="50"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Masukan Berat Pakaian"
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#21B7E2] text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            {isLoading ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
