import { useState, useEffect } from "react";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import {
  getLaundryService,
  createLaundryService,
  updateLaundryService,
  softDeleteLaundryService,
} from "../services/admin.services";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ laundryCategory: "", price: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLaundryService();
      setServices(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memuat daftar layanan!",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      laundryCategory: service.laundryCategory,
      price: service.price,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditingService(null);
    setFormData({ laundryCategory: "", price: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, price: parseInt(formData.price) };

    try {
      if (editingService) {
        await updateLaundryService(editingService.serviceId, dataToSubmit);
      } else {
        await createLaundryService(dataToSubmit);
      }

      cancelEdit();
      fetchData();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: editingService
          ? "Layanan berhasil diperbarui!"
          : "Layanan baru berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Operasi Gagal",
        text: error.response?.data?.message || "Pastikan semua data valid.",
        confirmButtonColor: "#0ea5e9",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Layanan yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDeleteLaundryService(id);
          fetchData();
          Swal.fire({
            toast: true,
            icon: "success",
            title: "Layanan berhasil dihapus!",
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus",
            text: "Terjadi kesalahan saat menghapus layanan.",
          });
        }
      }
    });
  };

  return (
    <div className="animate-fadeIn">
      {/* 🧺 FORM */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 mb-8 transition hover:shadow-lg">
        <h2 className="text-2xl font-bold text-sky-600 mb-4 flex items-center gap-2">
          {editingService ? (
            <>
              <Edit size={20} /> Edit Layanan
            </>
          ) : (
            <>
              <PlusCircle size={22} /> Tambah Layanan Baru
            </>
          )}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nama Layanan
            </label>
            <input
              type="text"
              name="laundryCategory"
              value={formData.laundryCategory}
              onChange={handleInputChange}
              placeholder="Contoh: Cuci Kering"
              className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Contoh: 10000"
              className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-lg hover:bg-sky-600 transition-all duration-200 shadow"
            >
              {editingService ? (
                "Update"
              ) : (
                <>
                  <PlusCircle size={18} /> Tambah
                </>
              )}
            </button>
            {editingService && (
              <button
                type="button"
                onClick={cancelEdit}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 📋 TABLE */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 overflow-hidden transition hover:shadow-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Nama Layanan</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  Memuat data layanan...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 italic"
                >
                  Belum ada layanan yang tersedia.
                </td>
              </tr>
            ) : (
              services.map((service, index) => (
                <tr
                  key={service.serviceId}
                  className={`transition-all duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-sky-50`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {service.laundryCategory}
                  </td>
                  <td className="px-6 py-4 font-semibold text-sky-600">
                    Rp {service.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-4">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Edit Layanan"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.serviceId)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Hapus Layanan"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
