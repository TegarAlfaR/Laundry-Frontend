// src/components/admin/ManageServices.jsx

import { useState, useEffect } from "react";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

// =================================================================
// ==             PERBAIKAN UTAMA ADA DI BARIS INI                ==
// =================================================================
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
    window.scrollTo(0, 0);
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
      let successMessage = "";
      if (editingService) {
        await updateLaundryService(editingService.serviceId, dataToSubmit);
        successMessage = "Layanan berhasil diperbarui!";
      } else {
        await createLaundryService(dataToSubmit);
        successMessage = "Layanan baru berhasil ditambahkan!";
      }

      cancelEdit();
      fetchData();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Operasi Gagal",
        text: error.response?.data?.message || "Pastikan semua data valid.",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Layanan yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDeleteLaundryService(id);
          fetchData();
          Swal.fire("Dihapus!", "Layanan berhasil dihapus.", "success");
        } catch (error) {
          Swal.fire("Gagal!", "Gagal menghapus layanan.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md border grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div className="md:col-span-2">
          <label
            htmlFor="laundryCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Layanan
          </label>
          <input
            type="text"
            id="laundryCategory"
            name="laundryCategory"
            value={formData.laundryCategory}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Harga
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-md h-fit hover:bg-sky-600 transition-colors"
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
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md h-fit hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nama Layanan</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.serviceId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {service.laundryCategory}
                  </td>
                  <td className="px-6 py-4">
                    Rp {service.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 flex gap-4 justify-end">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.serviceId)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
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
