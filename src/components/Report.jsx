import { useEffect, useState } from "react";
import { Calendar, TrendingUp, Wallet, Filter, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import getReport from "../services/report.services";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });

  const [summary, setSummary] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
  });

  const fetchReports = async () => {
    try {
      setLoading(true);

      // Buat query string untuk filter
      const queryParams = new URLSearchParams();
      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);
      if (filters.status) queryParams.append("status", filters.status);

      // Ambil data dari service
      const data = await getReport(queryParams.toString());
      setReports(data);

      // Hitung summary
      const totalTransactions = data.length;
      const totalRevenue = data.reduce(
        (sum, trx) => sum + (trx.payment?.grossAmount || 0),
        0
      );
      setSummary({ totalTransactions, totalRevenue });
    } catch (err) {
      setError(err.message || "Gagal memuat laporan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchReports();
  };

  // 📄 Export ke PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Laporan Transaksi", 14, 15);
    doc.setFontSize(10);
    doc.text(
      `Total Transaksi: ${
        summary.totalTransactions
      } | Total Pendapatan: Rp ${summary.totalRevenue.toLocaleString("id-ID")}`,
      14,
      22
    );

    const tableColumn = ["Tanggal", "Pelanggan", "Status", "Total (Rp)"];
    const tableRows = reports.map((trx) => [
      new Date(trx.createdAt).toLocaleDateString("id-ID"),
      trx.user?.name || "-",
      trx.payment?.paymentStatus || "-",
      trx.payment?.grossAmount?.toLocaleString("id-ID") || 0,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 9 },
      theme: "striped",
    });

    doc.save("Laporan_Transaksi.pdf");
  };

  // 📊 Export ke CSV
  const exportCSV = () => {
    const csvData = reports.map((trx) => ({
      Tanggal: new Date(trx.createdAt).toLocaleDateString("id-ID"),
      Pelanggan: trx.user?.name || "-",
      Status: trx.payment?.paymentStatus || "-",
      "Total (Rp)": trx.payment?.grossAmount?.toLocaleString("id-ID") || 0,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Laporan_Transaksi.csv");
  };

  if (loading)
    return (
      <div className="text-gray-500 text-center mt-10">Memuat laporan...</div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Terjadi kesalahan: {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="text-sky-500" size={28} />
        <h1 className="text-3xl font-bold text-sky-600">Laporan Transaksi</h1>
      </div>

      {/* Filter */}
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-xl shadow-sm border"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Tanggal Mulai
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-48"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Tanggal Akhir
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-48"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-md px-3 py-2 w-40"
          >
            <option value="">Semua</option>
            <option value="pending">Pending</option>
            <option value="on-progress">On Progress</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Filter size={18} /> Terapkan
        </button>
      </form>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between border">
          <div>
            <h2 className="text-gray-500 text-sm">Total Transaksi</h2>
            <p className="text-3xl font-bold text-sky-600">
              {summary.totalTransactions}
            </p>
          </div>
          <TrendingUp className="text-sky-500" size={32} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between border">
          <div>
            <h2 className="text-gray-500 text-sm">Total Pendapatan</h2>
            <p className="text-3xl font-bold text-green-600">
              Rp {summary.totalRevenue.toLocaleString("id-ID")}
            </p>
          </div>
          <Wallet className="text-green-500" size={32} />
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <FileDown size={18} /> Download PDF
        </button>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <FileDown size={18} /> Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-sky-700">
            <tr>
              <th className="px-4 py-3 border">Tanggal</th>
              <th className="px-4 py-3 border">Pelanggan</th>
              <th className="px-4 py-3 border">Status Pembayaran</th>
              <th className="px-4 py-3 border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((trx) => (
              <tr
                key={trx.transactionId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border text-gray-700">
                  {new Date(trx.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 border text-gray-700">
                  {trx.user?.name || "-"}
                </td>
                <td className="px-4 py-3 border text-gray-700 capitalize">
                  {trx.payment?.paymentStatus || "-"}
                </td>
                <td className="px-4 py-3 border text-right text-gray-700">
                  Rp {trx.payment?.grossAmount?.toLocaleString("id-ID") || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
