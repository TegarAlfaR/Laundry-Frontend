import { X } from "lucide-react";

export default function OrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
  );
}
