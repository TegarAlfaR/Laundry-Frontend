import { useState, useEffect } from "react";
import {
  updateTransaction,
  getAllTransaction,
} from "../services/admin.services";
import { Edit, X } from "lucide-react";
import Swal from "sweetalert2";

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTransaction();
      setTransactions(data);
    } catch (err) {
      setError("Gagal memuat data transaksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleUpdateSuccess = () => {
    fetchData();
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Memuat transaksi...
      </p>
    );
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
        {error}
      </div>
    );

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-sky-600 mb-8 text-center">
        Manajemen Transaksi
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada transaksi.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {transactions.map((trx) => (
            <div
              key={trx.transactionId}
              className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-wrap justify-between items-start border-b pb-3 mb-4 gap-2">
                <div>
                  <p className="font-bold text-gray-800 break-words">
                    Order #{trx.transactionId}
                  </p>
                  <p className="text-sm text-gray-500">User ID: {trx.userId}</p>
                  <p className="text-xs text-gray-400">
                    Dipesan:{" "}
                    {new Date(trx.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <StatusBadge status={trx.status} />
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <p className="break-words">
                  <span className="font-semibold">Alamat:</span>{" "}
                  {trx.address || "-"}
                </p>
                <p>
                  <span className="font-semibold">Jadwal:</span>{" "}
                  {new Date(trx.pickupTime).toLocaleString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="border-t pt-2">
                  <p className="font-semibold mb-1">Layanan:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {trx.order_item?.map((item) => (
                      <li key={item.orderItemId}>
                        {item.service?.laundryCategory || "N/A"}:{" "}
                        <span className="font-semibold">
                          {item.quantity ?? 0}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Total Harga:
                  </p>
                  <p className="text-lg font-bold text-sky-600">
                    {trx.totalPrice
                      ? `Rp ${trx.totalPrice.toLocaleString("id-ID")}`
                      : "Belum dihitung"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(trx)}
                className="mt-4 w-full bg-sky-500 text-white py-2.5 rounded-lg hover:bg-sky-600 transition flex justify-center items-center gap-2 font-medium"
              >
                <Edit size={16} /> Update
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <UpdateTransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

// 🔹 Modal Update (Responsive)
const UpdateTransactionModal = ({ transaction, onClose, onUpdateSuccess }) => {
  const [status, setStatus] = useState(transaction.status);
  const [items, setItems] = useState(
    transaction.order_item.map((item) => ({
      orderItemId: item.orderItemId,
      quantity: item.quantity || 0,
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemQuantityChange = (orderItemId, quantity) => {
    const newQuantity = Math.max(0, parseInt(quantity) || 0);
    setItems((current) =>
      current.map((item) =>
        item.orderItemId === orderItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Yakin ingin memperbarui transaksi?",
      text: "Pastikan data sudah benar sebelum disimpan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setIsSubmitting(true);
    try {
      await updateTransaction(transaction.transactionId, { status, items });
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Transaksi berhasil diperbarui!",
        showConfirmButton: false,
        timer: 2500,
      });
      onUpdateSuccess();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui",
        text:
          err.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui transaksi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg md:max-w-2xl p-6 rounded-xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            Update Order #{transaction.transactionId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Pesanan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400"
            >
              <option value="pending">Pending</option>
              <option value="on-progress">On Progress</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Update Kuantitas (kg/pcs)
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-2 border-t pt-2">
              {transaction.order_item.map((item) => {
                const current = items.find(
                  (i) => i.orderItemId === item.orderItemId
                );
                return (
                  <div
                    key={item.orderItemId}
                    className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded-md"
                  >
                    <p className="flex-grow text-gray-700 text-sm">
                      {item.service?.laundryCategory ||
                        `Item ${item.orderItemId}`}
                    </p>
                    <input
                      type="number"
                      min="0"
                      value={current?.quantity || 0}
                      onChange={(e) =>
                        handleItemQuantityChange(
                          item.orderItemId,
                          e.target.value
                        )
                      }
                      className="w-24 p-1.5 border border-gray-300 rounded-md text-center text-sm focus:ring-2 focus:ring-sky-300"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:bg-sky-300 transition font-medium"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🔸 Badge Status
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    "on-progress": "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${colors[status]}`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export default ManageTransactions;
