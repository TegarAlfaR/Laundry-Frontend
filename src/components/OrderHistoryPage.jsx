import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, PackagePlus, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import transactionServices from "../services/order.services";
import paymentServices from "../services/payment.services";

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchOrdersHistory = async () => {
    try {
      const data = await transactionServices.getOrdersHistory();
      setOrders(data);
    } catch (err) {
      setError("Gagal memuat riwayat pesanan. Silakan coba lagi nanti.");
      console.error(err);
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
          onSuccess: function (result) {
            Swal.fire({
              title: "Pembayaran Berhasil!",
              text: "Terima kasih, pesanan kamu sedang diproses.",
              icon: "success",
              confirmButtonColor: "#21B7E2",
            });
            console.log(result);
            fetchOrdersHistory();
          },
          onPending: function (result) {
            Swal.fire({
              title: "Menunggu Pembayaran",
              text: "Silakan selesaikan pembayaran kamu.",
              icon: "info",
              confirmButtonColor: "#21B7E2",
            });
            console.log(result);
          },
          onError: function (result) {
            Swal.fire({
              title: "Terjadi Kesalahan!",
              text: "Gagal memproses pembayaran. Coba lagi ya.",
              icon: "error",
              confirmButtonColor: "#21B7E2",
            });
            console.error(result);
          },
          onClose: function () {
            Swal.fire({
              title: "Pembayaran Dibatalkan",
              text: "Kamu menutup popup tanpa menyelesaikan pembayaran.",
              icon: "warning",
              confirmButtonColor: "#21B7E2",
            });
          },
        });
      } else {
        Swal.fire({
          title: "Gagal Memuat Midtrans",
          text: "Silakan refresh halaman dan coba lagi.",
          icon: "error",
          confirmButtonColor: "#21B7E2",
        });
      }
    } catch (err) {
      console.error("Gagal membuat pembayaran:", err);
      Swal.fire({
        title: "Gagal Membuat Pembayaran",
        text: err?.response?.data?.message || "Terjadi kesalahan tak terduga.",
        icon: "error",
        confirmButtonColor: "#21B7E2",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Memuat riwayat pesanan Anda...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#21B7E2] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-colors duration-300 mb-6"
      >
        <ArrowLeft size={16} />
        Kembali
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <ClipboardList className="w-8 h-8 text-sky-500" />
        <h1 className="text-3xl font-bold text-gray-800">
          Riwayat Pesanan Saya
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Anda belum memiliki riwayat pesanan.
          </p>
          <Link
            to="/order"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <PackagePlus size={18} />
            Buat Pesanan Pertama Anda
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.transactionId}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{order.transactionId}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Dipesan pada:{" "}
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-semibold">Alamat Jemput:</p>
                  <p className="text-gray-700">{order.address}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Jadwal Jemput:</p>
                  <p className="text-gray-700">
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

              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Detail Layanan:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {order.order_item?.map((item) => (
                    <li key={item.orderItemId} className="text-gray-600">
                      {item.service?.laundryCategory ||
                        "Layanan tidak ditemukan"}{" "}
                      :{" "}
                      <span className="text-gray-800 font-semibold">
                        {item.quantity ?? 0}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right mt-4 border-t pt-4">
                <span className="text-gray-500">Total Harga:</span>
                <p className="text-xl font-bold text-sky-600">
                  {order.totalPrice
                    ? `Rp ${order.totalPrice.toLocaleString("id-ID")}`
                    : "Menunggu Dihitung"}
                </p>

                {order.status === "on-progress" && (
                  <button
                    onClick={() => handlePayment(order.transactionId)}
                    className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
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
  );
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    "on-progress": "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  const badgeStyle = statusStyles[status] || "bg-gray-100 text-gray-800";
  return (
    <span
      className={`px-3 py-1 text-xs font-bold capitalize rounded-full ${badgeStyle}`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export default OrdersHistoryPage;
