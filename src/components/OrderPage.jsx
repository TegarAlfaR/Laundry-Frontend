import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PackagePlus } from "lucide-react";
import Swal from "sweetalert2";

import orderServices from "../services/order.services";
import getLaundryService from "../services/laundryService.services";

const OrderPage = () => {
  const [address, setAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getLaundryService();
        setServices(data);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal memuat layanan",
          text: "Terjadi kesalahan saat memuat daftar layanan.",
          confirmButtonColor: "#0ea5e9",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    setSelectedServices((prev) =>
      e.target.checked
        ? [...prev, serviceId]
        : prev.filter((id) => id !== serviceId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0 || !address || !pickupTime) {
      Swal.fire({
        icon: "warning",
        title: "Form belum lengkap",
        text: "Silakan isi semua field dan pilih minimal satu layanan.",
        confirmButtonColor: "#0ea5e9",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = selectedServices.map((id) => ({ serviceId: id }));
      const formattedPickupTime = pickupTime.replace("T", " ") + ":00";
      const orderData = {
        address,
        pickupTime: formattedPickupTime,
        orderItems,
      };

      await orderServices.makeOrders(orderData);

      Swal.fire({
        icon: "success",
        title: "Pesanan berhasil dibuat!",
        text: "Anda akan diarahkan ke halaman pesanan Anda.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/my-orders"), 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Membuat Pesanan",
        text: err.response?.data?.message || "Terjadi kesalahan.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="animate-pulse text-gray-500">Memuat layanan...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-200 transition"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>

          <div className="flex items-center gap-2 text-sky-600">
            <PackagePlus size={22} />
            <h1 className="text-xl sm:text-2xl font-bold">Buat Pesanan Baru</h1>
          </div>
        </div>

        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center">
          Isi detail di bawah ini untuk melakukan pemesanan laundry Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PILIH LAYANAN */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Pilih Layanan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <label
                  key={service.serviceId}
                  className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    selectedServices.includes(service.serviceId)
                      ? "bg-sky-50 border-sky-400 shadow-md"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={service.serviceId}
                      onChange={handleServiceChange}
                      checked={selectedServices.includes(service.serviceId)}
                      className="h-5 w-5 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <span className="font-medium text-gray-800 capitalize">
                      {service.laundryCategory.replace(/-/g, " ")}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">
                    Rp {service.price.toLocaleString("id-ID")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ALAMAT */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Alamat Penjemputan
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap Anda"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none text-gray-700"
            />
          </div>

          {/* WAKTU PENJEMPUTAN */}
          <div>
            <label
              htmlFor="pickupTime"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Waktu Penjemputan
            </label>
            <input
              type="datetime-local"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
              min={minDateTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none text-gray-700"
            />
          </div>

          {/* TOMBOL SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-sky-600 hover:to-sky-700 focus:ring-4 focus:ring-sky-300 disabled:opacity-70 transition-all duration-200"
          >
            {isSubmitting ? "Memproses Pesanan..." : "Pesan Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
