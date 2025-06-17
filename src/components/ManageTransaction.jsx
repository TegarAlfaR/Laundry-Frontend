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

  if (loading) return <p className="text-gray-500">Memuat transaksi...</p>;
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manajemen Transaksi
      </h2>
      {transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <div className="space-y-6">
          {transactions.map((trx) => (
            <div
              key={trx.transactionId}
              className="bg-white p-5 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start border-b pb-4 mb-4">
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    Order #{trx.transactionId}
                  </p>
                  <p className="text-sm text-gray-500">
                    User ID: {trx.userId} | Dipesan:{" "}
                    {new Date(trx.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <StatusBadge status={trx.status} />
                  <button
                    onClick={() => handleOpenModal(trx)}
                    className="text-sm bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center gap-2"
                  >
                    <Edit size={14} /> Update
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {/* Info Alamat & Waktu */}
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Alamat Penjemputan:
                    </p>
                    <p className="text-gray-700">{trx.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">
                      Jadwal Penjemputan:
                    </p>
                    <p className="text-gray-700">
                      {new Date(trx.pickupTime).toLocaleString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {/* Info Layanan & Harga */}
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Layanan yang Dipesan:
                    </p>
                    <ul className="list-disc list-inside pl-1 text-gray-700">
                      {trx.order_item?.map((item) => (
                        <li key={item.orderItemId}>
                          {item.service?.laundryCategory || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-gray-500">Total Harga:</p>
                    <p className="text-lg font-bold text-sky-600">
                      {trx.totalPrice
                        ? `Rp ${trx.totalPrice.toLocaleString("id-ID")}`
                        : "Belum dihitung"}
                    </p>
                  </div>
                </div>
              </div>
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

// Komponen Modal
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
    const newQuantity = parseInt(quantity) >= 0 ? parseInt(quantity) : 0;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.orderItemId === orderItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updateData = { status, items };
    try {
      await updateTransaction(transaction.transactionId, updateData);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Transaksi berhasil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      onUpdateSuccess();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Gagal",
        text: error.response?.data?.message || "Gagal memperbarui transaksi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 className="text-lg font-bold text-gray-800">
            Update Order #{transaction.transactionId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* ... Isi form tidak ada perubahan ... */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status Pesanan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="on-progress">On Progress</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Update Kuantitas (kg/pcs)
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 border-t pt-2">
            {transaction.order_item.map((item) => {
              const currentItemState = items.find(
                (i) => i.orderItemId === item.orderItemId
              );
              return (
                <div
                  key={item.orderItemId}
                  className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-md"
                >
                  <p className="flex-grow text-gray-700">
                    {item.service?.laundryCategory ||
                      `Item ID ${item.orderItemId}`}
                  </p>
                  <input
                    type="number"
                    min="0"
                    value={currentItemState?.quantity || 0}
                    onChange={(e) =>
                      handleItemQuantityChange(item.orderItemId, e.target.value)
                    }
                    className="w-24 p-1 border border-gray-300 rounded-md text-center"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:bg-sky-300"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Komponen helper untuk status badge
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
      className={`px-3 py-1 text-xs font-bold capitalize rounded-full whitespace-nowrap ${badgeStyle}`}
    >
      {status === "success" ? "Success" : status.replace("-", " ")}
    </span>
  );
};

export default ManageTransactions;
