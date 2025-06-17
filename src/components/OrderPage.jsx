import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PackagePlus } from "lucide-react";

import orderServices from "../services/order.services";
import getLaundryService from "../services/laundryService.services";

const OrderPage = () => {
  const [address, setAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getLaundryService();
        setServices(data);
      } catch (err) {
        setError("Gagal memuat daftar layanan.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedServices((prev) => [...prev, serviceId]);
    } else {
      setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedServices.length === 0 || !address || !pickupTime) {
      setError("Harap lengkapi semua field dan pilih minimal satu layanan.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const orderItems = selectedServices.map((id) => ({ serviceId: id }));
      const formattedPickupTime = pickupTime.replace("T", " ") + ":00";
      const orderData = {
        address,
        pickupTime: formattedPickupTime,
        orderItems,
      };

      await orderServices.makeOrders(orderData);
      setSuccess(true);
      setError(null);
      setAddress("");
      setPickupTime("");
      setSelectedServices([]);

      setTimeout(() => navigate("/my-orders"), 2000);
    } catch (err) {
      const message = err.response?.data?.message || "Gagal membuat pesanan.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  if (isLoading) {
    return <div className="text-center mt-10">Memuat layanan...</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-slate-100 font-sans p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-lg self-start mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#21B7E2] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Buat Pesanan Baru
          </h1>
          <p className="mt-2 text-gray-600">
            Pilih layanan yang Anda inginkan.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* ... bagian pilih layanan ... */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Pilih Layanan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
              {services.map((service) => (
                <label
                  key={service.serviceId}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={service.serviceId}
                    onChange={handleServiceChange}
                    checked={selectedServices.includes(service.serviceId)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {service.laundryCategory} (Rp{" "}
                    {service.price.toLocaleString("id-ID")})
                  </span>
                </label>
              ))}
            </div>
          </div>
          ;{/* ... bagian alamat ... */}
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
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          ;{/* BAGIAN WAKTU PENJEMPUTAN */}
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
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {/* ... Notifikasi & Tombol Submit ... */}
          {error && (
            <p className="text-sm font-medium text-center text-red-500">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm font-medium text-center text-green-500">
              Pesanan berhasil dibuat! Anda akan diarahkan...
            </p>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses Pesanan..." : "Pesan Sekarang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
