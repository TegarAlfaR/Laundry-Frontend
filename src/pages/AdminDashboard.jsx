import React from "react";
import Sidebar from "../components/Sidebar";
import OrderTable from "../components/OrderTable";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Daftar Pesanan</h1>
        <OrderTable />
      </main>
    </div>
  );
};

export default AdminDashboard;
