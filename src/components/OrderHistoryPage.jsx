import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  PackagePlus,
  ArrowLeft,
  Info,
  Copy,
} from "lucide-react";

import transactionServices from "../services/order.services";

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  useEffect(() => {
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

    fetchOrdersHistory();
  }, []);

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

      <div className="bg-sky-50  p-6 rounded-r-lg flex gap-4 items-start mb-8">
        <Info className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
        <div className="flex-grow">
          <h3 className="font-bold text-gray-800 mb-2">
            Informasi Pembayaran & Bantuan
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Silakan lakukan pembayaran ke salah satu rekening berikut dan
            konfirmasi melalui WhatsApp.
          </p>
          <div className="space-y-2 text-sm">
            {[
              { name: "BCA", number: "123456789" },
              { name: "Dana", number: "123456789" },
              { name: "Gopay", number: "123456789" },
            ].map((acc) => (
              <div
                key={acc.name}
                className="flex justify-between items-center bg-sky-100 p-2 rounded-md"
              >
                <span className="font-semibold text-gray-700">
                  {acc.name}: <span className="font-mono">{acc.number}</span>
                </span>
                <button
                  onClick={() => handleCopy(acc.number, acc.name)}
                  className="text-gray-500 hover:text-sky-600"
                  title={`Salin nomor ${acc.name}`}
                >
                  {copied === acc.name ? (
                    <span className="text-xs text-green-600">Disalin!</span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Jika ada pertanyaan, hubungi kami via WhatsApp:
          </p>
          <a
            href="https://wa.me/62881011836906"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>

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
