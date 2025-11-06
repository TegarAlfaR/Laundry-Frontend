import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, PackagePlus, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import transactionServices from "../services/order.services";
import paymentServices from "../services/payment.services";

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Snap JS SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const fetchOrdersHistory = async () => {
    try {
      const data = await transactionServices.getOrdersHistory();
      setOrders(data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Riwayat Pesanan",
        text: "Silakan coba lagi nanti.",
        confirmButtonColor: "#21B7E2",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersHistory();
  }, []);

  const handlePayment = async (transactionId) => {
    try {
      const response = await paymentServices.createPayment(transactionId);
      const token = response.token;

      if (window.snap && token) {
        window.snap.pay(token, {
          onSuccess: (result) => {
            Swal.fire({
              icon: "success",
              title: "Pembayaran Berhasil!",
              text: "Terima kasih, pesanan kamu sedang diproses.",
              confirmButtonColor: "#21B7E2",
            });
            fetchOrdersHistory();
          },
          onPending: () =>
            Swal.fire({
              icon: "info",
              title: "Menunggu Pembayaran",
              text: "Silakan selesaikan pembayaran kamu.",
              confirmButtonColor: "#21B7E2",
            }),
          onError: () =>
            Swal.fire({
              icon: "error",
              title: "Gagal Memproses Pembayaran",
              text: "Terjadi kesalahan. Coba lagi ya.",
              confirmButtonColor: "#21B7E2",
            }),
          onClose: () =>
            Swal.fire({
              icon: "warning",
              title: "Pembayaran Dibatalkan",
              text: "Kamu menutup popup sebelum selesai membayar.",
              confirmButtonColor: "#21B7E2",
            }),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Midtrans Tidak Tersedia",
          text: "Silakan refresh halaman dan coba lagi.",
          confirmButtonColor: "#21B7E2",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Membuat Pembayaran",
        text: err?.response?.data?.message || "Terjadi kesalahan tak terduga.",
        confirmButtonColor: "#21B7E2",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-pulse text-gray-500">
          Memuat riwayat pesanan Anda...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-all duration-300 shadow-md"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ClipboardList className="w-8 h-8 text-sky-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Riwayat Pesanan Saya
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Kelola dan pantau semua pesanan laundry Anda dengan mudah.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
            <p className="text-gray-600 mb-4">
              Anda belum memiliki riwayat pesanan.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <PackagePlus size={18} />
              Buat Pesanan Pertama Anda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div
                key={order.transactionId}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-4 gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Order #{order.transactionId}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Dipesan pada{" "}
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-600">
                      Alamat Jemput:
                    </p>
                    <p className="text-gray-800">{order.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">
                      Jadwal Jemput:
                    </p>
                    <p className="text-gray-800">
                      {new Date(order.pickupTime).toLocaleString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Layanan */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Detail Layanan:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {order.order_item?.map((item) => (
                      <li key={item.orderItemId}>
                        {item.service?.laundryCategory || "Layanan tidak ada"}{" "}
                        <span className="font-semibold">
                          ({item.quantity ?? 0})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total & Action */}
                <div className="mt-4 pt-4 border-t text-right">
                  <p className="text-gray-500 text-sm">Total Harga:</p>
                  <p className="text-xl font-bold text-sky-600">
                    {order.totalPrice
                      ? `Rp ${order.totalPrice.toLocaleString("id-ID")}`
                      : "Menunggu Dihitung"}
                  </p>

                  {order.status === "on-progress" && (
                    <button
                      onClick={() => handlePayment(order.transactionId)}
                      className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Bayar Sekarang
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// STATUS BADGE
const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    "on-progress": "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    failed: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-bold capitalize rounded-full ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export default OrdersHistoryPage;
